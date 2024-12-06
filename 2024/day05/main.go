package main

import (
	"advent2024/util"
	"fmt"
	"slices"
)

func main() {

	data := util.GetDataByRow("day05")

	part1(data)
	part2(data)
}

type node struct {
	Value   int
	Afters  []int
	Befores []int
}

func analyzeData(data []string) (followersMap map[int]node, updates [][]int) {
	foundSeparator := false
	followersMap = make(map[int]node)
	for _, row := range data {
		//fmt.Println(row)
		if row == "" {
			foundSeparator = true
			continue
		}
		if !foundSeparator {
			splittedInstruction := util.StringToIntSlice(row, "|")

			if _, ok := followersMap[splittedInstruction[0]]; !ok {
				followersMap[splittedInstruction[0]] = node{Value: splittedInstruction[0], Afters: []int{}, Befores: []int{}}
			}
			newNode := followersMap[splittedInstruction[0]]
			newNode.Afters = append(newNode.Afters, splittedInstruction[1])
			followersMap[splittedInstruction[0]] = newNode

			if _, ok := followersMap[splittedInstruction[1]]; !ok {
				followersMap[splittedInstruction[1]] = node{Value: splittedInstruction[1], Afters: []int{}, Befores: []int{}}
			}
			beforeNode := followersMap[splittedInstruction[1]]
			beforeNode.Befores = append(beforeNode.Befores, splittedInstruction[0])
			followersMap[splittedInstruction[1]] = beforeNode
		} else {
			updates = append(updates, util.StringToIntSlice(row, ","))
		}
	}
	// fmt.Printf("followersMap %v\n", followersMap)
	return followersMap, updates
}

func checkOrdering(followingMap map[int]node, updates []int) (middle int, ok bool) {
	indexMiddle := len(updates) / 2
	for i := 0; i < len(updates); i++ {
		followers, _ := followingMap[updates[i]]

		for j := 0; j < len(updates); j++ {
			if i == j {
				continue
			}
			var arrayToCompare []int
			if i < j {
				arrayToCompare = followers.Afters
			} else {
				arrayToCompare = followers.Befores
			}
			if !slices.Contains(arrayToCompare, updates[j]) {
				// fmt.Printf("The element %d should not be followed by %d\n", updates[i], updates[j])
				return 0, false
			}
		}
	}
	return updates[indexMiddle], true
}

func checkAndSwitch(followingMap map[int]node, updates []int) (middle int, ok bool) {
	// clone slice
	originalUpdates := make([]int, len(updates))
	copy(originalUpdates, updates)
	indexMiddle := len(updates) / 2
	i := 0
	retries := 0
	for i < len(updates) {
		followers, _ := followingMap[updates[i]]
		retry := false

		for j := 0; j < len(updates); j++ {
			if i == j {
				continue
			}
			var arrayToCompare []int
			if i < j {
				arrayToCompare = followers.Afters
			} else {
				arrayToCompare = followers.Befores
			}
			if !slices.Contains(arrayToCompare, updates[j]) {
				// switch elements
				updates[i], updates[j] = updates[j], updates[i]
				retry = true
				break
			}
		}
		if !retry {
			i++
			retries = 0
		} else {
			// fmt.Printf("Switch from %v to %v\n", originalUpdates, updates)
			if retries == len(updates) {
				// fmt.Printf("No solution found [%s]\n", updates)
				return 0, false
			}
			retries++
		}
	}
	return updates[indexMiddle], true
}

func part1(data []string) {
	sum := 0

	followersMap, updates := analyzeData(data)
	for _, update := range updates {
		if middle, ok := checkOrdering(followersMap, update); ok {
			// fmt.Printf("updates %v - middle %d\n", update, middle)
			sum += middle
		}
	}

	fmt.Printf("Part 1: %d\n", sum)
}

func part2(data []string) {
	sum := 0

	followersMap, updates := analyzeData(data)
	for _, update := range updates {
		if _, ok := checkOrdering(followersMap, update); !ok {
			// Try to order
			if middle, ok := checkAndSwitch(followersMap, update); ok {
				sum += middle
			}
		}
	}

	fmt.Printf("Part 2: %d\n", sum)
}
