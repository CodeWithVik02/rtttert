import { ChakraProvider, Flex, Heading, Text, Icon } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import ChakraUITable from './Table';
import { BsCheckCircle,BsX } from "react-icons/bs";
import React from 'react';
// Example Table
export const TodoListTable = ({screenWidth})=>{
  const columns = [
    {
      Header: '#',
      Cell: ({ row }) => (<Text>{row.index + 1}</Text>)
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Title',
      accessor: 'title',
    },
    {
      Header: 'Completed',
      accessor: 'completed',
      Cell: ({ value }) => (value ? <Icon as={BsCheckCircle} color="green"/>: <Icon as={BsX} color="red"/>)
    },
  ]

  const [data, setData] = useState(null)

  const loadData = useRef()
  loadData.current = async () => {
    const urls = ['https://jsonplaceholder.typicode.com/users', 'https://jsonplaceholder.typicode.com/todos']
    try {
      const result = await Promise.all(
        urls.map(url => fetch(url).then(r => r.json()))
      )

      if (result.length === 2) {
        // index 0 is user
        // index 1 is todo
        const todoList = result[1].map(todo => {
          todo.user = result[0].find(i => i.id === todo.userId)
          todo.name = todo.user?.name
          return todo
        })

        setData(todoList)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadData.current()
  }, [])

  return (
    data && <ChakraUITable columns={columns} data={data} screenWidth={screenWidth}/>
    )
}
