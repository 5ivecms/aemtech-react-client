import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TablePagination from '@material-ui/core/TablePagination'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye'
import {
  deleteVacancy,
  fetchVacancies,
  setCurrentPage,
} from '../../redux/actions/vacancies'
import {
  setPublish,
  setSearchQuery,
  setSort,
} from '../../redux/actions/filters'

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 500,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  actionBtn: {
    margin: theme.spacing(0),
  },
}))

const GridViewVacancy = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const vacancies = useSelector(({ vacancies }) => vacancies.items)
  const filterIsPublish = useSelector(({ filters }) => filters.isPublish)
  const sort = useSelector(({ filters }) => filters.sort)
  const search = useSelector(({ filters }) => filters.search)

  const total = useSelector(({ vacancies }) => vacancies.total)
  const currentPage = useSelector(({ vacancies }) => vacancies.page)
  const perPage = useSelector(({ vacancies }) => vacancies.perPage)

  useEffect(() => {
    dispatch(fetchVacancies(sort, search, filterIsPublish, currentPage))
  }, [dispatch, sort, search, filterIsPublish, currentPage])

  const handleSearch = (event) => {
    if (event.keyCode === 13) {
      dispatch(setCurrentPage(1))
      dispatch(setSearchQuery(event.target.value))
    }
  }

  const handlePublish = (event) => {
    dispatch(setCurrentPage(1))
    dispatch(setPublish(event.target.value))
  }

  const handleDelete = (id) => {
    dispatch(deleteVacancy(id))
  }

  const handleChangePage = (event, newPage) => {
    dispatch(setCurrentPage(newPage + 1))
  }

  const handlerChangeSort = () => {
    const type = sort === 'asc' ? 'desc' : 'asc'
    dispatch(setSort(type))
  }

  return (
    <>
      <TextField
        id="search-query"
        label="Поиск"
        className={classes.formControl}
        onKeyDown={handleSearch}
      />
      <FormControl className={classes.formControl}>
        <InputLabel id="select-publish-label">Публикация</InputLabel>
        <Select
          labelId="select-publish-label"
          id="select-publish"
          value={filterIsPublish}
          onChange={handlePublish}
        >
          <MenuItem value={1}>Опубликована</MenuItem>
          <MenuItem value={0}>Не опубликована</MenuItem>
          <MenuItem value={'all'}>Все</MenuItem>
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={true}
                  direction={sort}
                  onClick={handlerChangeSort}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">Название</TableCell>
              <TableCell align="left">Описание</TableCell>
              <TableCell align="left">Публикация</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vacancies &&
              vacancies.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="left">{row.text}</TableCell>
                  <TableCell align="left">
                    {row.isPublish ? 'Да' : 'Нет'}
                  </TableCell>
                  <TableCell align="right">
                    <ButtonGroup aria-label="outlined primary button group">
                      <Button
                        variant="contained"
                        className={classes.actionBtn}
                        component={Link}
                        to={`/vacancy/view/${row.id}`}
                      >
                        <RemoveRedEyeIcon fontSize="small" />
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.actionBtn}
                        component={Link}
                        to={`/vacancy/edit/${row.id}`}
                      >
                        <CreateIcon fontSize="small" />
                      </Button>
                      <Button
                        aria-label="delete"
                        variant="contained"
                        color="secondary"
                        className={classes.actionBtn}
                        onClick={() => handleDelete(row.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={total}
        rowsPerPage={perPage}
        page={currentPage - 1}
        onPageChange={handleChangePage}
      />
    </>
  )
}

export default GridViewVacancy
