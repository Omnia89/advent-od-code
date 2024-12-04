package main

import (
	"advent2024/util"
	"fmt"
)

func main() {

	data := util.GetDataByRow("day04")

	part1(data)
	part2(data)
}

func countXmas(data []string, row int, col int) int {
	if data[row][col] != 'X' {
		return 0
	}
	count := 0

	// check up
	if row >= 3 {
		if data[row-1][col] == 'M' && data[row-2][col] == 'A' && data[row-3][col] == 'S' {
			// fmt.Printf("Found XMAS UP at row %d, col %d\n", row, col)
			count++
		}
	}

	// check down
	if row <= len(data)-4 {
		if data[row+1][col] == 'M' && data[row+2][col] == 'A' && data[row+3][col] == 'S' {
			// fmt.Printf("Found XMAS DOWN at row %d, col %d\n", row, col)
			count++
		}
	}

	// check left
	if col >= 3 {
		if data[row][col-3:col+1] == "SAMX" {
			// fmt.Printf("Found XMAS LEFT at row %d, col %d\n", row, col)
			count++
		}
	}

	// check right
	if col <= len(data[row])-4 {
		if data[row][col:col+4] == "XMAS" {
			// fmt.Printf("Found XMAS RIGHT at row %d, col %d\n", row, col)
			count++
		}
	}

	// check up-left
	if row >= 3 && col >= 3 {
		if data[row-1][col-1] == 'M' && data[row-2][col-2] == 'A' && data[row-3][col-3] == 'S' {
			// fmt.Printf("Found XMAS UP-LEFT at row %d, col %d\n", row, col)
			count++
		}
	}

	// check up-right
	if row >= 3 && col <= len(data[row])-4 {
		if data[row-1][col+1] == 'M' && data[row-2][col+2] == 'A' && data[row-3][col+3] == 'S' {
			// fmt.Printf("Found XMAS UP-RIGHT at row %d, col %d\n", row, col)
			count++
		}
	}

	// check down-left
	if row <= len(data)-4 && col >= 3 {
		if data[row+1][col-1] == 'M' && data[row+2][col-2] == 'A' && data[row+3][col-3] == 'S' {
			// fmt.Printf("Found XMAS DOWN-LEFT at row %d, col %d\n", row, col)
			count++
		}
	}

	// check down-right
	if row <= len(data)-4 && col <= len(data[row])-4 {
		if data[row+1][col+1] == 'M' && data[row+2][col+2] == 'A' && data[row+3][col+3] == 'S' {
			// fmt.Printf("Found XMAS DOWN-RIGHT at row %d, col %d\n", row, col)
			count++
		}
	}

	return count
}

func countMas(data []string, row int, col int) int {
	if data[row][col] != 'A' {
		return 0
	}

	if row < 1 || row > len(data)-2 || col < 1 || col > len(data[row])-2 {
		return 0
	}

	count := 0

	// check M - M UP
	if data[row-1][col-1] == 'M' && data[row-1][col+1] == 'M' && data[row+1][col-1] == 'S' && data[row+1][col+1] == 'S' {
		count++
	}

	// check M - M DOWN
	if data[row-1][col-1] == 'S' && data[row-1][col+1] == 'S' && data[row+1][col-1] == 'M' && data[row+1][col+1] == 'M' {
		count++
	}

	// check M - M LEFT
	if data[row-1][col-1] == 'M' && data[row+1][col-1] == 'M' && data[row-1][col+1] == 'S' && data[row+1][col+1] == 'S' {
		count++
	}

	// check M - M RIGHT
	if data[row-1][col-1] == 'S' && data[row+1][col-1] == 'S' && data[row-1][col+1] == 'M' && data[row+1][col+1] == 'M' {
		count++
	}

	return count
}

func part1(data []string) {
	sum := 0

	for row := 0; row < len(data); row++ {
		for col := 0; col < len(data[row]); col++ {
			sum += countXmas(data, row, col)
		}
	}

	fmt.Printf("Part 1: %d\n", sum)
}

func part2(data []string) {
	sum := 0

	for row := 0; row < len(data); row++ {
		for col := 0; col < len(data[row]); col++ {
			sum += countMas(data, row, col)
		}
	}

	fmt.Printf("Part 2: %d\n", sum)
}
