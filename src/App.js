import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    field: []
  }
  //Создание состояния шахматной доски
  componentDidMount() {
    let field = [...this.state.field];
    let x = 0, y = 0;
    while (x < 12) {
      field[x] = [];
      y = 0;
      while (y < 12) {
        field[x][y] = 0;
        y++;
      }
      x++;
    };
    this.setState({ field });
  }
  //Функция отображения ходов
  cellHandler = (i, j) => {
    let field = [...this.state.field];
    //Очищаем поле от предыдущего выбора
    let x = 0, y = 0;
    while (x < 12) {
      y = 0;
      while (y < 12) {
        field[x][y] = 0;
        y++;
      }
      x++;
    }

    x = 0;
    //Логика окрашивания клеток ходов
    while (x < 12) {
      y = 0;
      while (y < 12) {
        if (x === i && y === j) {
          field[x][y] = 1;
          field[x - 1][y - 2] = 2;
          field[x - 2][y - 1] = 2;
          field[x - 2][y + 1] = 2;
          field[x - 1][y + 2] = 2;
          field[x + 1][y + 2] = 2;
          field[x + 2][y + 1] = 2;
          field[x + 2][y - 1] = 2;
          field[x + 1][y - 2] = 2;
        }
        y++;
      }
      x++;
    }
    this.setState({ field });
  }

  render() {
    let letterColumn = ["A", "B", "C", "D", "E", "F", "G", "H"]
    let field = this.state.field.map((row, i) => {
      if (i > 0 && i < 11) return (
        <tr key={i}>{
          row.map((cell, j) => {
            if ((i === 1 || i === 10) && (j === 1 || j === 10)) return <td key={String(i) + j}></td>
            if ((i === 1 || i === 10) && (j > 1 && j < 10)) return <td key={String(i) + j} className="letterCell">{letterColumn[j - 2]}</td>
            if ((i > 1 && i < 10) && (j === 1 || j === 10)) return <td key={String(i) + j} className="numberCell">{i - 1}</td>
            if (((i % 2 === 0 && i !== 10) && (j % 2 === 0 && j !== 10 && j !== 0)) || ((i % 2 !== 0 && i !== 1 && i !== 11) && (j % 2 !== 0 && j !== 1 && j !== 11))) return <td key={String(i) + j} className={this.state.field[i][j] !== 0 ? (this.state.field[i][j] === 1 ? "cellBlue" : "cellGreen") : "cellWhite"} onClick={() => this.cellHandler(i, j)}></td>
            if (((i % 2 === 0 && i !== 10) && (j % 2 !== 0 && j !== 1 && j !== 11)) || ((i % 2 !== 0 && i !== 1 && i !== 11) && (j % 2 === 0 && j !== 10 && j !== 0))) return <td key={String(i) + j} className={this.state.field[i][j] !== 0 ? (this.state.field[i][j] === 1 ? "cellBlue" : "cellGreen") : "cellBlack"} onClick={() => this.cellHandler(i, j)}></td>
          })
        }
        </tr>
      );
    });
    return (
      <div className="App">
        <table>
          <tbody>
            {field}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
