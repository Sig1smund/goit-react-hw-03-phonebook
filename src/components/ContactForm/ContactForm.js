import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import propTypes from 'prop-types';
import * as Yup from 'yup';
import s from './contactForm.module.css';

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must contain at least 2 characters!')
    .max(20, 'Name must contain at most 20 characters!')
    .required('Name is required'),
  number: Yup.string()
    .min(3, 'Number must contain at least 2 characters!')
    .max(10, 'Number must contain at most 20 characters!')
    .required('Number is required'),
});
class ContactForm extends Component {
  state = { name: '', number: '' };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = (values, { resetForm }) => {
    const { name, number } = values;
    const newObject = { name: name, number: number };
    this.props.data(newObject);

    this.setState({ name: '', number: '' });
    resetForm();
  };

  render() {
    return (
      <div className={s.form}>
        <Formik
          initialValues={this.state}
          onSubmit={this.handleSubmit}
          validationSchema={contactSchema}
        >
          <Form>
            <label className={s.contacts__label}>
              Name
              <br />
              <Field className={s.input} name="name" />
            </label>
            <br />
            <ErrorMessage className={s.error} component="span" name="name" />
            <br />
            <label className={s.contacts__label}>
              Number
              <br />
              <Field className={s.input} name="number" />
            </label>
            <br />
            <ErrorMessage className={s.error} component="span" name="number" />
            <br />
            <button type="submit" className={s.button}>
              Add contact
            </button>
          </Form>
        </Formik>
      </div>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  data: propTypes.func,
};
