import styles from './TextField.module.scss'

interface Props {
  type: string,
  value: string,
  variant: string
  text: string
  errorMsg: string
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLSelectElement>,
  ) => void;
}

const TextField: React.FC<Props> = ({
  type,
  value,
  variant,
  text,
  errorMsg,
  onChange }): JSX.Element => {
    const wrapper = `${variant}Wrapper`
    return (
        <div className={styles[wrapper]}>
          <p className={styles.title}>{text}</p>
          <div style={{flexDirection:"column"}}>
            <input 
              className={errorMsg && variant === 'calculate' ? styles.calculateError : styles[variant]} 
              type={type} 
              value={value} 
              onChange={onChange}
            />
            {errorMsg ? <p className={styles.errorMsg}>{errorMsg}</p> : <div className={styles.emptyErrorMsg}>{''}</div>}
          </div>
        </div>
    );
  }


export default TextField