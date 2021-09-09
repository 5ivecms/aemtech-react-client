import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Home from './pages/Home'
import { Header } from './components'
import VacancyCreate from './pages/Vacancy/Create'
import VacancyEdit from './pages/Vacancy/Edit'
import VacancyView from './pages/Vacancy/View'

function App() {
  return (
    <div className="App">
      <Header />
      <Container style={{ marginTop: '100px' }} maxWidth="lg">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/vacancy/create" component={VacancyCreate} />
          <Route path="/vacancy/edit/:id" component={VacancyEdit} />
          <Route path="/vacancy/view/:id" component={VacancyView} />
        </Switch>
      </Container>
    </div>
  )
}

export default App
