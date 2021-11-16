package main

import (
    "bufio"
    "fmt"
    "io"
    "os"
    "strconv"
    "strings"
)


func countingSort(arr []int32) []int32 {
    var max int32
    var min int32
    //find min and max
    for i := 0; i < len(arr); i++ {
        if i == 0 {
            max = arr[i]
            min = arr[i]
        } else {
            if arr[i] > max {
                max = arr[i]
            }
            if arr[i] < min {
                min = arr[i]
            }
        }
    }
    //make map of zeros
    m := make(map[int32]int32)
    for i := min; i < max+1; i++ {
        m[i] = 0
    }
    for i := int32(0); i < int32(len(arr)); i++ {
        m[arr[i]] += int32(1)
    }
    counts := make([]int32, max+1)
    for i := min; i < max+1; i++ {
        counts[i] = m[i]
    }
    fmt.Println(counts)
    return counts
}

func main() {
    reader := bufio.NewReaderSize(os.Stdin, 16 * 1024 * 1024)

    stdout, err := os.Create(os.Getenv("OUTPUT_PATH"))
    checkError(err)

    defer stdout.Close()

    writer := bufio.NewWriterSize(stdout, 16 * 1024 * 1024)

    nTemp, err := strconv.ParseInt(strings.TrimSpace(readLine(reader)), 10, 64)
    checkError(err)
    n := int32(nTemp)

    arrTemp := strings.Split(strings.TrimSpace(readLine(reader)), " ")

    var arr []int32

    for i := 0; i < int(n); i++ {
        arrItemTemp, err := strconv.ParseInt(arrTemp[i], 10, 64)
        checkError(err)
        arrItem := int32(arrItemTemp)
        arr = append(arr, arrItem)
    }

    result := countingSort(arr)

    for i, resultItem := range result {
        fmt.Fprintf(writer, "%d", resultItem)

        if i != len(result) - 1 {
            fmt.Fprintf(writer, " ")
        }
    }

    fmt.Fprintf(writer, "\n")

    writer.Flush()
}

func readLine(reader *bufio.Reader) string {
    str, _, err := reader.ReadLine()
    if err == io.EOF {
        return ""
    }

    return strings.TrimRight(string(str), "\r\n")
}

func checkError(err error) {
    if err != nil {
        panic(err)
    }
}
