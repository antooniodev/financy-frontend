import {
  CategoryItem,
  CategoryList,
  ContainerChartCategory,
  SelectItem,
  SelectTypeCategory,
} from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { useState } from 'react'
import { formatCurrency } from '../../utils/formatterCurrency'
import { useSelector } from 'react-redux'
import { SelectDates } from '../../store/dateFilterSlice'
import { useGetSummaryOfCategoriesQuery } from '../../services/categoryService'
import Loading from '../Loading/Loading'
const CategoryChart = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [typeSelected, setTypeSelected] = useState(false)
  const dates = useSelector(SelectDates)
  const { data: categories, isLoading } = useGetSummaryOfCategoriesQuery({
    type: typeSelected,
    startDate: dates.dateStart,
    endDate: dates.dateEnd,
  })
  // const [chartWidth, setChartWidth] = useState(0)
  // const chartContainerRef = useRef<HTMLDivElement>(null)
  // const [chartData, setChartData] = useState<
  //   {
  //     label: string
  //     value: number
  //     color: string
  //   }[]
  // >([])

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (chartContainerRef.current) {
  //       setChartWidth(chartContainerRef.current.offsetWidth)
  //     }
  //   }
  //   handleResize()
  //   window.addEventListener('resize', handleResize)
  //   return () => {
  //     window.removeEventListener('resize', handleResize)
  //   }
  // }, [])

  // useEffect(() => {
  //   const data = categories?.map(category => {
  //     return {
  //       label: category.label,
  //       value: category.value, // Convert the value to a number
  //       color: category.color === '#FFFFFF' ? '#000000' : category.color,
  //     }
  //   })

  //   setChartData(data ? [...data] : [])
  // }, [categories])

  // const series = [
  //   {
  //     innerRadius: 60,
  //     outerRadius: 120,
  //     id: 'series-2',
  //     data: chartData,
  //     cx: chartWidth / 2.5,
  //   },
  // ]
  return (
    <ContainerChartCategory>
      <p className="title">Resumo por Categoria</p>
      {/* {chartData && chartData?.length > 0 ? (
        <div className="chart-container" ref={chartContainerRef}>
          <PieChart
            series={series}
            width={chartWidth * 0.8}
            height={300}
            slotProps={{ legend: { hidden: true } }}
          />
        </div>
      ) : (
        <span>Crie novas transações de saída.</span>
      )} */}

      <SelectTypeCategory>
        <SelectItem
          $isActive={typeSelected}
          onClick={() => setTypeSelected(true)}
        >
          Entradas
        </SelectItem>
        <SelectItem
          $isActive={!typeSelected}
          onClick={() => setTypeSelected(false)}
        >
          Saídas
        </SelectItem>
      </SelectTypeCategory>
      {isLoading ? (
        <Loading />
      ) : (
        <CategoryList>
          {categories?.map(item => (
            <CategoryItem key={item.label}>
              <section>
                <div
                  className="container-icon"
                  style={{
                    backgroundColor: `${item.color === '#FFFFF' ? '#000000' : item.color}`,
                  }}
                >
                  <FontAwesomeIcon icon={item.icon as IconProp} />
                </div>
              </section>
              <div className="container-info">
                <span>{item.label}</span>
                <p className="percentage">
                  {formatCurrency(item.spent_total)} | {item.value.toFixed(2)}%
                </p>
              </div>
            </CategoryItem>
          ))}
        </CategoryList>
      )}
    </ContainerChartCategory>
  )
}

export default CategoryChart
