package main

import (
	"advent2024/util"
	"fmt"
	"regexp"
	"sort"
	"strings"
)

func main() {

	data := util.GetDataByRow("day01")
	left := make([]int, 0, len(data))
	right := make([]int, 0, len(data))
	var re = regexp.MustCompile(`\s+`)
	for _, d := range data {
		trimmed := re.ReplaceAllString(strings.TrimSpace(d), " ")
		split := strings.Split(trimmed, " ")
		left = append(left, util.ToInt(split[0]))
		right = append(right, util.ToInt(split[1]))
	}

	part1(left, right)
	part2(left, right)
}

func part1(left []int, right []int) {
	sort.Ints(left)
	sort.Ints(right)

	diff := 0
	for i := range left {
		tmp := left[i] - right[i]
		if tmp < 0 {
			tmp *= -1
		}
		diff += tmp
	}
	fmt.Printf("Part 1: %d\n", diff)
}

func part2(left []int, right []int) {
	appearenceMap := make(map[int]int)
	for _, r := range right {
		appearenceMap[r]++
	}

	sum := 0
	for _, l := range left {
		if t, ok := appearenceMap[l]; ok {
			sum += l * t
		}
	}

	fmt.Printf("Part 2: %d\n", sum)
}
