import s from './filter.module.css';
import propTypes from 'prop-types';

export default function Filter({ options, eventHandler }) {
  return (
    <label className={s.filter__label}>
      Find contacts by name
      <br />
      <input
        className={s.filter__form}
        type="text"
        name="filter"
        value={options}
        onChange={eventHandler}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      />
    </label>
  );
}

Filter.propTypes = {
  eventHandler: propTypes.func,
  options: propTypes.string,
};
