import type { NextPage } from 'next'
import ChessBoard from '../components/ChessBoard'
import useWindowSize from '../hooks/useWindowSize'
import ChessPieces from '../components/ChessPieces'
import { useState, useEffect, useRef } from 'react'

const Chess: NextPage = () => {
  const clientRef = useRef<HTMLDivElement>(null)
  const { width, height } = useWindowSize();
  const [cellWidth, setCellWidth] = useState(width / 9);


  useEffect(() => {
    if (clientRef.current) {
      const rect = clientRef.current.getBoundingClientRect();
      if (rect.width > rect.height) {
        console.log('widthwww:', Math.floor(rect.width));
        setCellWidth(Math.floor(rect.height) / 10);
      } else {
        console.log('width444:', Math.floor(rect.width));
        setCellWidth(Math.floor(rect.width) / 9);
      }
      console.log('size:', clientRef.current.getBoundingClientRect());
    }
    console.log(width, height);
  }, [cellWidth])

  return (
    <div
      ref={ clientRef }
      style={{
      width: '100vw',
      height: '100vh',
    }}>
      <div style={{
        position: 'relative',
        width: 'fit-content',
        margin: '0 auto',
      }}>
        <ChessBoard width={ width } cellWidth={ cellWidth } />
        <ChessPieces cellWidth={ cellWidth } />
      </div>
    </div>
  )
}

export default Chess
