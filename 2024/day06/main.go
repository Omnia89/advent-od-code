package main

import (
	"advent2024/util"
	"fmt"
	"strconv"
)

func main() {

	data := util.GetDataByRow("day06")

	part1(data)

	data2 := util.GetDataByRow("day06")

	part2(data2)
}

func findGuard(data []string) (row int, col int, direction rune) {
	// find guard
	for i, row := range data {
		for j, col := range row {
			if col == '^' || col == 'v' || col == '<' || col == '>' {
				return i, j, col
			}
		}
	}
	return -1, -1, ' '
}

func turnRight(direction rune) rune {
	switch direction {
	case '^':
		return '>'
	case 'v':
		return '<'
	case '<':
		return '^'
	case '>':
		return 'v'
	}
	return ' '
}

func getDirectionValue(direction rune) int64 {
	switch direction {
	case '^':
		return 1
	case 'v':
		return 2
	case '<':
		return 4
	case '>':
		return 8
	}
	return 0
}

func newStep(row int, col int, direction rune) (newRow int, newCol int) {
	switch direction {
	case '^':
		return row - 1, col
	case 'v':
		return row + 1, col
	case '<':
		return row, col - 1
	case '>':
		return row, col + 1
	}
	return row, col
}

func walk(data []string, row int, col int, direction rune, part2 bool) (newRow int, newCol int, newDirection rune, end bool) {
	// walk
	tmpRow := row
	tmpCol := col
	place := string(direction)
	tmpRow, tmpCol = newStep(row, col, direction)

	if part2 {
		current := data[row][col]
		var value int64 = 0
		if current != '.' {
			value, _ = strconv.ParseInt(string(current), 16, 64)
			value += getDirectionValue(direction)
		} else {
			value = getDirectionValue(direction)
		}
		place = strconv.FormatInt(value, 16)
	}

	if tmpRow < 0 || tmpRow >= len(data) || tmpCol < 0 || tmpCol >= len(data[0]) {
		data[row] = data[row][:col] + place + data[row][col+1:]
		return row, col, direction, true
	}

	if data[tmpRow][tmpCol] != '#' {
		// track walk path
		data[row] = data[row][:col] + place + data[row][col+1:]
		return tmpRow, tmpCol, direction, false
	}

	// turn right
	newDirection = turnRight(direction)

	// fmt.Printf("turning right:[%d,%d] %c\n", row, col, newDirection)

	return walk(data, row, col, newDirection, part2)
}

func searchLoops(data []string) (loops int) {

	// TODO CONVERTI AL UTILIZZO DEGLI HEX

	nRows := len(data)
	nCols := len(data[0])
	loops = 0
	// search up -> right
	for r := 1; r < nRows; r++ {
		crossed := 0
		for c := 0; c < nCols; c++ {
			if data[r][c] == '.' {
				continue
			}
			currentValue, _ := strconv.ParseInt(string(data[r][c]), 16, 64)
			if currentValue&8 == 8 { // ^
				crossed++
				continue
			}
			if currentValue&1 == 1 { // >
				loops += crossed
			}
			crossed = 0
		}
	}

	// search down -> left
	for r := 0; r < nRows-1; r++ {
		crossed := 0
		for c := nCols - 1; c >= 0; c-- {
			if data[r][c] == '.' {
				continue
			}
			currentValue, _ := strconv.ParseInt(string(data[r][c]), 16, 64)
			if currentValue&4 == 4 { // v
				crossed++
				continue
			}
			if currentValue&2 == 2 { // <
				loops += crossed
			}
			crossed = 0
		}
	}

	//search right -> down
	for c := 0; c < nCols-1; c++ {
		crossed := 0
		for r := 0; r < nRows; r++ {
			if data[r][c] == '.' {
				continue
			}
			currentValue, _ := strconv.ParseInt(string(data[r][c]), 16, 64)
			if currentValue&1 == 1 { // >
				crossed++
				continue
			}
			if currentValue&4 == 4 { // v
				loops += crossed
			}
			crossed = 0
		}
	}

	//search left -> up
	for c := 1; c < nCols; c++ {
		crossed := 0
		for r := nRows - 1; r >= 0; r-- {
			if data[r][c] == '.' {
				continue
			}
			currentValue, _ := strconv.ParseInt(string(data[r][c]), 16, 64)
			if currentValue&2 == 2 { // <
				crossed++
				continue
			}
			if currentValue&8 == 8 { // ^
				loops += crossed
			}
			crossed = 0
		}
	}
	return loops
}

func countPath(data []string) int {
	count := 0
	for _, row := range data {
		for _, col := range row {
			if col != '.' && col != '#' {
				count++
			}
		}
	}
	return count
}

func part1(data []string) {
	sum := 0

	r, c, d := findGuard(data)
	ends := false
	for !ends {
		r, c, d, ends = walk(data, r, c, d, false)
	}
	// fmt.Printf("r: %d, c: %d, d: %c\n", r, c, d)

	// print map
	// for i, row := range data {
	// 	fmt.Printf("|%03d| %s\n", i+1, row)
	// }

	sum = countPath(data)

	fmt.Printf("Part 1: %d\n", sum)
}

func part2(data []string) {
	sum := 0

	r, c, d := findGuard(data)
	ends := false
	for !ends {
		r, c, d, ends = walk(data, r, c, d, true)
	}

	// print map
	for i, row := range data {
		fmt.Printf("|%03d| %s\n", i+1, row)
	}

	sum = searchLoops(data)

	fmt.Printf("Part 2: %d\n", sum)
}
