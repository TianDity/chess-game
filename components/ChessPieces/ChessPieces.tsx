import { jsx, css } from '@emotion/react'
import { Grid, GridItem } from '@chakra-ui/react'
import { useState, useReducer, useEffect } from 'react';
import { piecesReducer } from './piecesReducer';
import { initialStore } from '../../store';
import Image from 'next/image';
import useThrottleFn from '../../hooks/useThrottleFn';

function ChessPieces({ cellWidth }: { cellWidth: number }) {
  const [player, setPlayer] = useState('red');
  const [start, setStart] = useState(Date.now());
  const [winPlayer, setWinPlayer] = useState('');
  const [focusId, setFocusId] = useState('');
  const [pieces, dispatch] = useReducer(piecesReducer, initialStore);
  const [xFocus, yFocus] = focusId?.split('-').map(Number);

  useEffect(() => {
    if (winPlayer === 'red') {
      setTimeout(() => {
        alert('红方获胜')
      }, 500)
    }

    if (winPlayer === 'black') {
      setTimeout(() => {
        alert('黑方获胜')
      }, 500)
    }
  }, [winPlayer])
  
  function handlePieceClick(e: any) {
    const id = e.target.getAttribute('data-id');
    console.log('id:', id);
    const [x, y] = id.split('-').map(Number);
    const touchPiece = pieces[y][x];
    if (!focusId && touchPiece.status === 1 && touchPiece.color === player) {
      setFocusId(touchPiece.id);
      setStart(Date.now());
    }

    const end = Date.now();

    if (focusId === id && end - start > 1200) {
      setFocusId('');
    }

    if (focusId && focusId !== id) {
      const focusPiece = pieces[yFocus][xFocus];

      dispatch({
        type: 'move',
        setFocusId,
        setPlayer,
        setWinPlayer,
        focusPiece,
        touchPiece,
      })
    }
  }

  const { run } = useThrottleFn(
    (e) => handlePieceClick(e),
    { wait: 500 }
  )

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    }}>
      <Grid
        templateColumns="repeat(9, 1fr)"
        templateRows="repeat(10, 1fr)"
        onClick={ run }
      >
        {
          pieces.flat().map((item: any) => {
            const [x, y] = item.id.split('-');
            let imgSrc = '';

            if (!item.type || !item.color) {
              imgSrc = '/img/empty.png' 
            } else {
              imgSrc = `/img/${item.type}_${item.color}.png`
            }

            return (
              <GridItem
                key={item.id}
                css={chess_pieces(xFocus, yFocus)}
                h={cellWidth > 90 ? '90' : cellWidth}
                data-id={`${x}-${y}`}
              >
                <Image
                  src={imgSrc}
                  width={cellWidth}
                  height={cellWidth}
                  data-id={`${x}-${y}`}
                />
              </GridItem>
            )
          })
        }
      </Grid>
    </div>
  );
}

export default ChessPieces;


/* style start */
const chess_pieces = (x: number, y: number) =>
  css`
    &[data-id="${x}-${y}"] {
      background: center / contain no-repeat url("/img/chess_bg.png");
    }

    @media (min-width: 768px) {
      height: 90px;
    }
  `
/* style end */
