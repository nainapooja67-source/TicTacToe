import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function HomeScreen() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState("");

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (newBoard: string[]) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;

      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setWinner(newBoard[a]);
        return;
      }
    }

    if (!newBoard.includes("")) {
      setWinner("Draw");
    }
  };

  const handlePress = (index: number) => {
    if (board[index] !== "" || winner !== "") return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";

    setBoard(newBoard);
    checkWinner(newBoard);
    setIsXTurn(!isXTurn);
  };

  const restartGame = () => {
    setBoard(Array(9).fill(""));
    setWinner("");
    setIsXTurn(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Tic Tac Toe</Text>

      {winner === "" ? (
        <Text style={styles.turn}>
          Turn: {isXTurn ? "❌ X" : "⭕ O"}
        </Text>
      ) : winner === "Draw" ? (
        <Text style={styles.draw}>🤝 It's a Draw!</Text>
      ) : (
        <Text style={styles.winner}>🏆 Winner: {winner}</Text>
      )}

      <View style={styles.board}>
        {board.map((value, index) => (
          <TouchableOpacity
            key={index}
            style={styles.box}
            onPress={() => handlePress(index)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.boxText,
                {
                  color: value === "X" ? "#EF4444" : "#2563EB",
                },
              ]}
            >
              {value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={restartGame}
      >
        <Text style={styles.buttonText}>🔄 Restart Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D6EAF8",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 20,
    letterSpacing: 2,
  },

  turn: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginBottom: 20,
  },

  winner: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#16A34A",
    marginBottom: 20,
  },

  draw: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#F59E0B",
    marginBottom: 20,
  },

  board: {
    width: 303,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  box: {
    width: 95,
    height: 95,
    margin: 3,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    elevation: 6,
  },

  boxText: {
    fontSize: 42,
    fontWeight: "bold",
  },

  button: {
    marginTop: 35,
    backgroundColor: "#0F172A",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    elevation: 6,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});