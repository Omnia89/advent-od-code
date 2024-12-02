package main

import (
	"advent2024/util"
	"fmt"
	"slices"
)

func main() {

	rawData := util.GetDataByRow("day02")
	data := make([][]int, len(rawData))
	for i, row := range rawData {
		data[i] = util.StringToIntSlice(row, " ")
	}

	part1(data)
	part2(data)
}

func getDirections(num int) int {
	if num > 0 {
		return 1
	} else {
		return -1
	}
}

func isRowUnsafe(row []int) bool {
	direction := 0
	for i := 0; i < len(row)-1; i++ {
		if direction == 0 {
			diff := row[i] - row[i+1]
			direction = getDirections(diff)
		}
		if isUnsafe(direction, row[i], row[i+1]) {
			return true
		}
	}
	return false
}

func isUnsafe(direction int, firstData int, secondData int) bool {
	diff := firstData - secondData
	if direction != getDirections(diff) {
		return true
	}

	if diff < 0 {
		diff = -diff
	}
	if diff > 3 || diff == 0 {
		return true
	}
	return false
}

func part1(data [][]int) {
	safe := 0

	for _, row := range data {
		if !isRowUnsafe(row) {
			safe++
			continue
		}
	}

	fmt.Printf("Part 1: %d\n", safe)
}

func part2(data [][]int) {
	safe := 0

	for _, row := range data {
		if !isRowUnsafe(row) {
			safe++
			continue
		}

		for i := range row {
			smaller := slices.Delete(slices.Clone(row), i, i+1)
			if !isRowUnsafe(smaller) {
				safe++
				break
			}
		}
	}
	fmt.Printf("Part 2: %d\n", safe)
}
