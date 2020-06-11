import React, { Component } from 'react'
import Board from './Board';
import Color from '../constants/color';
import styled from 'styled-components';
import { darken } from "polished";


/* style start */
const Container = styled.div`
  margin: 12% auto;
  width: 200px;
  height: 100vh;
  text-align: center;
`;

const Title = styled.h1`
  font-family: 'Righteous', cursive;
  font-size: 26px;
`;

const Turn = styled.div`
  display: flex;
  margin-bottom: 24px;
  padding: 16px 0;
  font-size: 20px;

  .player {
    padding-bottom: 8px;
    width: 50%;

    &.active {
      border-bottom: 4px solid ${Color.mainColor};
    }
  }
`;

const Message = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0;
  font-weight: bold;
  font-size: 16px;
  color: #6c6c6c;

  i {
    margin-right: 4px;
    font-size: 22px;
  }

  &.result {
    color: sienna;
  }
`;

const RestartBtn = styled.a`
  display: block;
  padding: 8px 0;
  background: ${Color.mainColor};
  border-radius: 4px;
  color: #fff;
  font-family: 'Righteous', cursive;
  font-size: 16px;
  transition: .5s;

  &:hover {
    background: ${darken(0.1, Color.mainColor)};
    cursor: pointer;
  }
`;
/*　style end */



const CROSS = <i class="fas fa-times"></i>
const CIRCLE = <i class="far fa-circle"></i>

let progress;

function checkWinner(Cells) {
  const WINNING_PATTERN = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < WINNING_PATTERN.length; i++) {
    const [a, b, c] = WINNING_PATTERN[i];
    if (Cells[a] && Cells[a] === Cells[b] && Cells[b] === Cells[c]) {
      return Cells[a];
    }
  }
  return null;
}

export default class Game extends Component {
  constructor(props) {
      super(props);
      this.state = {
          CircleTurn: true,　//先行はCircle
          Cells: Array(9).fill(null),
          History: []
      }
  }

//Restart
  restartGame = () => {
    this.setState({
      CircleTurn: true,　//先行はCircle
      Cells: Array(9).fill(null),
      History: []
    })
  };
    
  handleClick(i) {
    const Cells = this.state.Cells.slice()
    const History = this.state.History

    if (checkWinner(Cells) || Cells[i]) {
        return;
    }
    
    Cells[i] = this.state.CircleTurn ? CIRCLE : CROSS
    History.push(this.state.CircleTurn ? CIRCLE : CROSS)

    // Update component
    this.setState({
      Cells: Cells,
      CircleTurn: !this.state.CircleTurn,
      History: History,
    });
  }

  render() {
    const Winner = checkWinner(this.state.Cells)
    console.log(History.length);

    if (Winner) {
      progress = this.state.CircleTurn ? CROSS : CIRCLE + 'wins! Congrats!';
    } else if(Winner === null && this.state.History.length === 8) { 
      progress = 'draw!';
      //ここにクリックイベント中止の処理を入れたい
    } else {
      progress = 'starting...';
    }

    return (
      <Container>
        <header>
          <Title>TIC TAC TOE</Title>
        </header>
        <Turn>
          <div class="player active">{CIRCLE}</div>
          <div class="player">{CROSS}</div>
        </Turn>
        <Board id="board" onClick={(i) => this.handleClick(i)} Cells={this.state.Cells} />
        <footer>
          <Message>{progress}</Message>
          <RestartBtn onClick={this.restartGame}>RESTART</RestartBtn>
        </footer>
      </Container>
    )
  }
}

