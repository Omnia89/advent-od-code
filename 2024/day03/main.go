package main

import (
	"advent2024/util"
	"fmt"
)

func main() {

	data := util.GetRawData("day03")

	part1(data)
	part2(data)
}

func scanMul(data string) (num1 int, num2 int, ok bool) {
	if len(data) < 8 {
		return
	}

	if data[0:4] != "mul(" {
		return
	}

	num1Str := ""
	num2Str := ""

	closingParentheses := false
	foundComma := false

	i := 4
	for {
		if i > 11 || i >= len(data) {
			break
		}
		if data[i] == ')' {
			closingParentheses = true
			break
		}
		if data[i] == ',' {
			foundComma = true
			i++
			continue
		}
		if !foundComma {
			num1Str += string(data[i])
		} else {
			num2Str += string(data[i])
		}
		i++
	}
	if !closingParentheses || num1Str == "" || num2Str == "" {
		return
	}

	return util.ToInt(num1Str), util.ToInt(num2Str), true
}

func scanDo(data string) (ok bool) {
	if len(data) < 4 {
		return false
	}

	if data[0:4] == "do()" {
		return true
	}
	return false
}

func scanDont(data string) (ok bool) {
	if len(data) < 7 {
		return
	}

	if data[0:7] == "don't()" {
		return true
	}
	return false
}

func part1(data string) {
	sum := 0
	for i := 0; i < len(data); i++ {
		num1, num2, ok := scanMul(data[i:])
		if ok {
			sum += num1 * num2
		}
	}
	fmt.Printf("Part 1: %d\n", sum)
}

func part2(data string) {
	sum := 0
	enabled := true
	for i := 0; i < len(data); i++ {
		if enabled {
			if scanDont(data[i:]) {
				enabled = false
				continue
			}
		} else {
			if scanDo(data[i:]) {
				enabled = true
				continue
			}
		}

		if enabled {
			num1, num2, ok := scanMul(data[i:])
			if ok {
				sum += num1 * num2
			}
		}
	}
	fmt.Printf("Part 2: %d\n", sum)
}
