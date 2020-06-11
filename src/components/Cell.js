import React from 'react';
import Color from '../constants/color';
import styled from 'styled-components';
import { lighten } from 'polished';


const Cell = styled.td`
  position: relative;
  width: 61px;
  height: 61px;
  background: #fff;
  font-family: "Font Awesome 5 Free";
  cursor: pointer;
  transition: .5s;

  &:hover {
    background: ${lighten(0.2, Color.mainColor)};
  }

  &.circle:before {
    position: absolute;
    bottom: 18px;
    right: 18px;
    content: '\f111';
    font-size: 22px;
  }

  &.cross:before {
    position: absolute;
    bottom: 7px;
    right: 17px;
    content: '×';
    font-size: 36px;
  }

  &.nonStyle:hover {
    background: #fff;
    cursor: default;
  }
`;

export default function EachCell(props) {
  return (
    <Cell className="cell {props.className}" onClick={props.onClick}>
      {props.value}
    </Cell>
  )
}
