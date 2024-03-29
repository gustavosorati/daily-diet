import { MealsContext } from '@context/MealsContext'
import { useNavigation } from '@react-navigation/native'
import { ArrowUpRight } from 'phosphor-react-native'
import { useContext } from 'react'
import { useTheme } from 'styled-components/native'
import { Text } from '../../../../components/Text'
import { Container, Icon } from './styles'

export function Banner () {
  const { meals } = useContext(MealsContext)

  const countGoodFoods = meals.reduce((goodFoodCount, meal) => {
    return goodFoodCount + meal.foods.filter((food) => food.status).length
  }, 0)
  const countBadFoods = meals.reduce((badFoodCount, meal) => {
    return badFoodCount + meal.foods.filter((food) => !food.status).length
  }, 0)
  const amountFoods = countGoodFoods + countBadFoods

  const porcentGoodFoods = ((countGoodFoods / amountFoods) * 100) || 0
  const porcentBadFoods = ((countBadFoods / amountFoods) * 100) || 0

  const resultStatus = porcentGoodFoods >= porcentBadFoods

  const theme = useTheme()

  const { navigate } = useNavigation()

  return (
    <Container
      onPress={() => { navigate('statistics') }}
      status={meals.length > 0 ? resultStatus : null}
    >
      <Icon>
        <ArrowUpRight
          size={22}
          color={meals.length > 0 ? (resultStatus ? theme.COLORS['green-dark'] : theme.COLORS['red-dark']) : theme.COLORS['gray-1']}
        />
      </Icon>

      <Text size={theme.FONT_SIZE['3XL']} weight={theme.FONT_FAMILY.BOLD}>
        {resultStatus ? countGoodFoods : countBadFoods}

      </Text>
      <Text color={theme.COLORS['gray-2']} size={theme.FONT_SIZE.MD}>
        das refeições {resultStatus ? 'dentro' : 'fora'} da dieta
      </Text>
    </Container>
  )
}
