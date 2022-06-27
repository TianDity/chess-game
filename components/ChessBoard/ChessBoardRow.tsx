import {
  Tr,
  Td
} from '@chakra-ui/react'
import { crossMark } from '../../helpers/crossMark'
import { xMark } from '../../helpers/xMark'
import { css } from '@emotion/react'

interface Props {
  y: number;
  width: number;
  cellWidth: number;
}

function ChessBoardRow({ y, width, cellWidth }: Props) {
  const borderStyle = '1px solid #484848';

  return (
    <>
      <Tr>
        {
          Array(8).fill(0).map((_, i) => {
            return (
              <Td
                css={[table_td, addTdLineStyle(i, y), ...addTdCrossStyle(i, y)]}
                style={{
                  height: `${cellWidth}px`,
                }}
                key={i}
                data-id={`${i}-${y}`}
              >
                {/* { i },{ y } */}
              </Td>
            ) 
          })
        }
      </Tr>
    </>
  )
}


function addTdCrossStyle(x: number, y: number) {
  const arr = crossMark(x, y);
  const res: any[] = [];

  const crossStyle = {
    0: td_cross_zero,
    1: td_cross_one,
    2: td_cross_two,
    3: td_cross_three,
    4: td_cross_four,
    5: td_cross_five,
  }

  if (arr.length === 2 && arr[0] === 0) {
    return [crossStyle[4]]
  }

  if (arr.length === 2 && arr[0] === 1) {
    return [crossStyle[5]]
  }

  arr.forEach(item => {
    res.push(crossStyle[item as keyof typeof crossStyle])
  })

  return res;
}

function addTdLineStyle(x: number, y: number) {
  const num = xMark(x, y);

  const lineStyle = {
    0: td_line_zero,
    1: td_line_one,
  }

  return lineStyle[num as keyof typeof lineStyle];
}

export default ChessBoardRow

/* style start */
const table_td = css`
  position: relative;
  border: 1px solid #484848;

  @media (min-width: 768px) {
    height: 90px !important;
  }

  &[data-id$="-4"]:not(:last-child) {
    border-right: none;
  }

  &[data-id$="-4"]:not(:first-child) {
    border-left: none;
  }
`

const td_cross_base = css`
  content: "";
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
`

const td_cross_zero = css`
  &::before {
    ${td_cross_base};
    top: 8px;
    left: 8px;
    border-top: 2px solid #484848;
    border-left: 2px solid #484848;
  }
`

const td_cross_one = css`
  &::before {
    ${td_cross_base};
    top: 8px;
    right: 8px;
    border-top: 2px solid #484848;
    border-right: 2px solid #484848;
  }  
`
const td_cross_two = css`
  &::before {
    ${td_cross_base};
    bottom: 8px;
    right: 8px;
    border-bottom: 2px solid #484848;
    border-right: 2px solid #484848;
  } 
`
const td_cross_three = css`
  &::before {
    ${td_cross_base};
    bottom: 8px;
    left: 8px;
    border-bottom: 2px solid #484848;
    border-left: 2px solid #484848;
  }  
`

const td_cross_four = css`
  &::after {
    ${td_cross_base};
    top: 8px;
    left: 8px;
    border-top: 2px solid #484848;
    border-left: 2px solid #484848;
  }

  &::before {
    ${td_cross_base};
    bottom: 8px;
    right: 8px;
    border-bottom: 2px solid #484848;
    border-right: 2px solid #484848;
  }
`

const td_cross_five = css`
  &::after {
    ${td_cross_base};
    top: 8px;
    right: 8px;
    border-top: 2px solid #484848;
    border-right: 2px solid #484848;
  }

  &::before {
    ${td_cross_base};
    bottom: 8px;
    left: 8px;
    border-bottom: 2px solid #484848;
    border-left: 2px solid #484848;
  }
`

const td_line_zero = css`
  background: linear-gradient(
    to top right,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) calc(50% - 1.2px),
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 0) calc(50% + 1.2px),
    rgba(0, 0, 0, 0) 100%
  )
` 
const td_line_one = css`
  background: linear-gradient(
    to bottom right,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) calc(50% - 1.2px),
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 0) calc(50% + 1.2px),
    rgba(0, 0, 0, 0) 100%
  )
` 
/* style end */
