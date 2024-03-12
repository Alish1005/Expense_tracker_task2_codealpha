import
{
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, AreaChart, Area, ResponsiveContainer, Label
} from 'recharts';
function LineCharts(props)
{
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <LineChart
        width={500}
        height={200}
        data={props.data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={props.xkey}><Label value={props.xkey} className='fw-bold' offset={-5} position="insideBottom" /></XAxis>
        {props.datakey3 != null &&
          <YAxis yAxisId="right" orientation="right"><Label value={`${props.datakey3} axis`} offset={50} angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} /></YAxis>}
        <YAxis yAxisId="left" />
        <Tooltip />
        {props.datakey != null && <Line type="monotone" yAxisId="left" dataKey={props.datakey} stroke="#8884d8" fill="#8884d8" />}
        {props.datakey2 != null && <Line type="monotone" yAxisId="left" dataKey={props.datakey2} stroke="#0DCAF0" fill="#0DCAF0" />}
        {props.datakey3 != null && <Line type="monotone" yAxisId="right" dataKey={props.datakey3} stroke="#009e15" fill="#009e15" />}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineCharts;