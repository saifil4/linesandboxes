import React, { useMemo } from 'react';
import styled from 'styled-components';

const Box = ({ box, config, selectLine }) => {

    const { x, y } = box;
    const { rows, columns, lineThickness, boxSize } = config;
    const lastColumn = columns - 1;
    const lastRow = rows - 1;

    const getLength = (condition) => condition ? boxSize + lineThickness : boxSize;
    const getDisplay = (condition) => condition ? 'block' : 'none';

    const handleLineClick = (e) => {
        selectLine(box, e.target.getAttribute("data-line"))
    }

    const boxColor = useMemo(() => {
        const lines = [box.top, box.left, box.right, box.bottom];
        if (lines.every(line => line.player !== null)) {
            lines.sort((a, b) => b.timestamp - a.timestamp);
            return lines[0].player;
        }
        return null;
    }, [box])

    return (
        <BoxShape className='.box' bg={boxColor}>
            <TopLine
                data-line="top"
                bg={box['top'].player}
                width={getLength(x === lastColumn)}
                height={lineThickness}
                onClick={handleLineClick}
            />
            <LeftLine
                data-line="left"
                bg={box['left'].player}
                width={lineThickness}
                height={getLength(y === lastRow)}
                onClick={handleLineClick} />
            <BottomLine
                data-line="bottom"
                bg={box['bottom'].player}
                display={getDisplay(y === lastRow)}
                width={getLength(y === lastRow)}
                height={lineThickness}
                onClick={handleLineClick} />
            <RightLine
                data-line="right"
                bg={box['right'].player}
                display={getDisplay(x === lastColumn)}
                width={lineThickness}
                height={getLength(x === lastColumn)}
                onClick={handleLineClick} />
        </BoxShape>
    )
}

export default Box;

const BoxShape = styled.div`
  position: relative;
  background: ${props => props.bg !== null ? props.bg + 60 : ' #f4f5f7'};
  display: inline-block;
`;

const Line = styled.div`
  position: absolute;
  background: ${props => props.bg !== null ? props.bg : 'grey'};
  opacity: 0.5;
  cursor: pointer;
  &: hover {
    opacity: 0.7;
  }
`;

const TopLine = styled(Line)`
  width: ${props => props?.width + 'px'};
  height: ${props => props?.height + 'px'};
  left: 0;
  top: 0;
`;

const BottomLine = styled(Line)`
  display: ${props => props?.display};
  width: ${props => props?.width + 'px'};
  height: ${props => props?.height + 'px'};
  left: 0;
  bottom: 0;
`;

const LeftLine = styled(Line)`
  width: ${props => props?.width + 'px'};
  height: ${props => props?.height + 'px'};;
  left: 0;
  top: 0;
`;

const RightLine = styled(Line)`
  display: ${props => props?.display};
  width: ${props => props?.width + 'px'};
  height: ${props => props?.height + 'px'};
  right: 0;
  top: 0;
`;