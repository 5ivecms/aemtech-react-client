import React from 'react'
import { Button, LinearProgress, InputLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { Switch } from 'formik-material-ui'
import * as yup from 'yup'

const validationSchema = yup.object({
  title: yup
    .string('Введите название')
    .required('Название не может быть пустым'),
  text: yup.string('Текст'),
  isPublish: yup.boolean('Публикация'),
})

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0),
    width: '100%',
  },
  input: {
    width: '100%',
    marginBottom: theme.spacing(4),
  },
  button: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  progress: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
}))

const VacancyForm = ({ onSubmit, title = '', text = '', isPublish = true }) => {
  const classes = useStyles()

  return (
    <Formik
      initialValues={{
        title,
        text,
        isPublish,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false)
        onSubmit(values)
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field
            className={classes.input}
            component={TextField}
            id="title"
            name="title"
            type="text"
            label="Название"
          />
          <Field
            className={classes.input}
            component={TextField}
            multiline
            type="text"
            label="Текст"
            id="text"
            name="text"
          />
          {isSubmitting && <LinearProgress className={classes.progress} />}
          <InputLabel>
            <Field
              component={Switch}
              type="checkbox"
              id="idPublish"
              name="isPublish"
            />
            Публикация
          </InputLabel>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Сохранить
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default VacancyForm
