import * as echarts from 'echarts/core'
import { LineChart, BarChart } from 'echarts/charts'
import {
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  BarChart,
  CanvasRenderer,
])

export default echarts