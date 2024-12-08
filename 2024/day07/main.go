package main

import (
	"advent2024/util"
	"fmt"
	"regexp"
)

func main() {

	data := util.GetDataByRow("day07")

	part1(data)

	part2(data)
}

type operation string

const (
	plus     operation = "+"
	multiply           = "*"
	concat             = "|"
)

func concatOp(a, b int) int {
	return util.ToInt(fmt.Sprintf("%d%d", a, b))
}

func evaluateExpression(numbers []int, operations []operation) int {
	if len(numbers) != len(operations)+1 {
		panic("Invalid input")
	}

	// fmt.Printf("EVAL numbers - operations: %v -  %v\n", numbers, operations)

	tot := numbers[0]
	for i := 1; i < len(numbers); i++ {
		// fmt.Printf("tot before: %d\n", tot)
		switch operations[i-1] {
		case plus:
			tot += numbers[i]
			// fmt.Printf("tot plus: [%d] %d\n", numbers[i], tot)
		case multiply:
			// fmt.Printf("tot multiply: [%d] %d\n", numbers[i], tot)
			tot *= numbers[i]
		case concat:
			// fmt.Printf("tot concat: [%d] %d\n", numbers[i], tot)
			tot = concatOp(tot, numbers[i])
		}
	}

	// fmt.Printf("EVAL tot: %d\n", tot)
	return tot
}

func nextPart1(operations []operation) (newOperations []operation, last bool) {
	if len(operations) == 0 {
		panic("Invalid input")
	}

	// fmt.Printf("NEXT old: %v\n", operations)

	remainder := true

	for i := len(operations) - 1; i >= 0; i-- {
		if operations[i] == multiply {
			remainder = true
			operations[i] = plus
		} else if remainder {
			operations[i] = multiply
			remainder = false
			break
		}
	}

	// fmt.Printf("NEXT new: %v\n", operations)

	return operations, remainder
}

func nextPart2(operations []operation) (newOperations []operation, last bool) {
	if len(operations) == 0 {
		panic("Invalid input")
	}

	isLast := true
	for i := 0; i < len(operations); i++ {
		if operations[i] != concat {
			isLast = false
			break
		}
	}
	if isLast {
		// fmt.Printf("IS LAST\n")
		return operations, true
	}

	// fmt.Printf("NEXT old: %v\n", operations)

	remainder := true

	for i := len(operations) - 1; i >= 0; i-- {
		if operations[i] == concat {
			remainder = true
			operations[i] = plus
		} else if remainder {
			switch operations[i] {
			case plus:
				operations[i] = multiply
			case multiply:
				operations[i] = concat
			}
			remainder = false
			break
		}
	}

	// fmt.Printf("NEXT new: %v\n", operations)

	return operations, remainder
}

func check(row string, part2 bool) (tot int, ok bool) {
	numbers := []int{}
	operations := []operation{}
	tot = 0

	regex := regexp.MustCompile(`(\d+):(.+)`)
	matches := regex.FindStringSubmatch(row)

	tot = util.ToInt(matches[1])
	numbers = util.StringToIntSlice(matches[2], " ")

	for i := 0; i < len(numbers)-1; i++ {
		operations = append(operations, plus)
	}

	notLast := true
	for notLast {
		if evaluateExpression(numbers, operations) == tot {
			// fmt.Printf("OK: %v : %v = %d \n", numbers, operations, tot)
			return tot, true
		}
		var tmp bool
		if part2 {
			operations, tmp = nextPart2(operations)
		} else {
			operations, tmp = nextPart1(operations)
		}
		notLast = !tmp
	}

	return tot, false
}

func part1(data []string) {
	sum := 0

	for _, row := range data {
		tot, ok := check(row, false)
		if ok {
			sum += tot
		}
	}

	fmt.Printf("Part 1: %d\n", sum)
}

func part2(data []string) {
	sum := 0

	for _, row := range data {
		tot, ok := check(row, true)
		if ok {
			sum += tot
		}
	}

	fmt.Printf("Part 2: %d\n", sum)
}
