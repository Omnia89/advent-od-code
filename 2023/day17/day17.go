package main

import (
	"advent2023/util"
	"fmt"
	"slices"
)

func main() {
	dataByRow := util.GetDataByRow("day16")

	// test data
	//dataByRow = []string{
	//}

	// 01 part
	part01Result := part01(dataByRow)
	fmt.Printf("First part: %d\n", part01Result)

	// 02 part
	part02Result := part02(dataByRow)
	fmt.Printf("Second part: %d\n", part02Result)
}

func part01(dataByRow []string) int {
	var result int = 0

	return result
}

func part02(dataByRow []string) int {
	result := 0

	return result
}

func getIndex(row, col int) string {
	return fmt.Sprintf("%d_%d", row, col)
}

func decomposeIndex(index string) (row, col int) {
	intParts := util.StringToIntSlice(index, "_")
	return intParts[0], intParts[1]
}

type Node struct {
	row int
	col int
}

type Queue []string

func (q Queue) removeNode(value string) Queue {
	index := slices.Index(value)
	q[index] = q[len(q)-1]
	return q[:len(index)-1]
}

func getNeighbors(index string, maxRow int, maxCol int) []string {
	row, col := decomposeIndex(index)
	neighbors := []string{}

	for i := 1; i <= 3; i++ {
		r := row + i
		if r < maxRow || r >= 0 {
			neighbors = append(neighbors, getIndex(r, col))
		}
		r = row - i
		if r < maxRow || r >= 0 {
			neighbors = append(neighbors, getIndex(r, col))
		}
		c := col + i
		if c < maxCol || c >= 0 {
			neighbors = append(neighbors, getIndex(row, c))
		}
		c = col - i
		if c < maxCol || c >= 0 {
			neighbors = append(neighbors, getIndex(row, c))
		}
	}
	return neighbors
}

func dijkstra(dataByRow [][]int) {
	distances := make(map[string]int)
	distances[getIndex(0, 0)] = 0

	queue := make(Queue, 0)

	getHeatValue := func(index string) int {
		r, c := decomposeIndex(index)
		return dataByRow[r][c]
	}

	getLesserDistance := func() string {
		lesserDistance := 1_000_000_000
		value := ""
		for key, distance := range distances {
			if distance < lesserDistance {
				lesserDistance = distance
				value = key
			}
		}
		return value
	}

	for r := 0; r < len(dataByRow); r++ {
		for c := 0; c < len(dataByRow[0]); c++ {
			if r != 0 && c != 0 {
				distances[getIndex(r, c)] = 999_999_999
			}
			queue = append(queue, getIndex(r, c))
		}
	}

	for len(queue) > 0 {
		minorVertex := getLesserDistance()
		queue.removeNode(minorVertex)

		neighbors := getNeighbors(minorVertex, len(dataByRow), len(dataByRow[0]))
		for _, n := range neighbors {
			value := distances[minorVertex] + getHeatValue(n)
			if value < distances[n] {
				distances[n] = value
			}
		}
	}
}
