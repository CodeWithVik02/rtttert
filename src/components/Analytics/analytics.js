import React  , {useState , useEffect}from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Flex, Heading } from '@chakra-ui/react';

export default function BarChartDemo({title, color, screenWidth}) {
    const data = [
      { name: 'Page A', visitors: 100 },
      { name: 'Page B', visitors: 200 },
      { name: 'Page C', visitors: 300 },
      { name: 'Page D', visitors: 400 },
      { name: 'Page E', visitors: 500 },
    ];
    const [currentScreenWidth, setCurrentScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setCurrentScreenWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    return (
      <Flex direction="column" alignItems="center">
        <Heading as="h3" size="md" mb="4">
          {title}
        </Heading>
        <BarChart width={400} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="visitors" fill={color} />
        </BarChart>
      </Flex>
    );
  }