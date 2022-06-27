import { handlePieceAction } from "../../helpers/pieceAction";
import { decideWin } from "../../helpers/decideWin";

export function piecesReducer(state: any, action: any) {
  const { setFocusId, setPlayer, setWinPlayer, focusPiece, touchPiece } = action;

  switch (action.type) {
      case 'move': {
        const bool = handlePieceAction(state, action);
        
        if (bool) {
          setFocusId('');

          const winResult = decideWin(state, {
            focusPiece,
            touchPiece,
          });

          setWinPlayer(winResult);

          console.log("win:", winResult);

          focusPiece.color === 'red' ? setPlayer('black') : setPlayer('red');

          return state.map((item: any) => {
            return item.map((piece: any) => {
              if (piece.id === touchPiece.id) {
                return {
                  ...piece,
                  status: 1,
                  type: focusPiece.type,
                  color: focusPiece.color
                }
              }

              if (piece.id === focusPiece.id) {
                return {
                  ...piece,
                  status: 0,
                  type: '',
                  color: '',
                }
              }

              return piece;
            })
          })
        }

        return state;
      }
      default:
          return state;
  }
}
