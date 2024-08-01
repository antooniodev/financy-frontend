import { CategoryItem, CategoryList, ContainerChartCategory } from "./styles"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { useEffect, useRef, useState } from "react"
import { PieChart } from "@mui/x-charts"
import { useGetCategoriesQuery } from "../../services/api"
const CategoryChart = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: categories } = useGetCategoriesQuery()
  const [chartWidth, setChartWidth] = useState(0)
  const chartContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (chartContainerRef.current) {
        setChartWidth(chartContainerRef.current.offsetWidth)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const data = categories?.map((category) => {
    return {
      label: category.name,
      value: Number(category.percentage), // Convert the value to a number
      color: category.color,
    }
  })
  const series = [
    {
      innerRadius: 60,
      outerRadius: 120,
      id: "series-2",
      data: data ?? [],
      cx: chartWidth / 2.5
    },
  ]
  return (
    <ContainerChartCategory>
      <p className='title'>Gastos por Categoria</p>
      <div className='chart-container' ref={chartContainerRef}>
        <PieChart
          series={series}
          width={chartWidth * 0.8}
          height={300}
          slotProps={{ legend: { hidden: true } }}
        />
      </div>
      <CategoryList>
        {categories?.map((item) => (
          <CategoryItem key={item.name}>
            <section>
              <div
                className='container-icon'
                style={{ backgroundColor: `${item.color}` }}>
                <FontAwesomeIcon icon={item.icon as IconProp}/>
              </div>
              <span>{item.name}</span>
            </section>
            <p className='percentage'>{item.percentage}%</p>
          </CategoryItem>
        ))}
      </CategoryList>
    </ContainerChartCategory>
  )
}

export default CategoryChart
