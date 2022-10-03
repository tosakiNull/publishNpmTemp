import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Form, Checkbox, Input } from 'semantic-ui-react';
// import ApiContext from '../default/ApiContext';

/**
 * @typedef {object} InputPropsList input 用 props 清單(僅列出常用)
 * @property {string} name name 屬性
 * @property {string} placeholder 文字框內提醒文字
 * @property {any} label 與 input 框一起顯示的組件或文字(semantic 設置)
 * @property {number} width Form 組件站位寬度(semantic 設置)
 * @property {boolean} action 可格式化提醒用戶輸入(semantic 設置)
 * @property {string} data-testid 測試用 test id
 * @property {Function} onFocus onFocus綁定 callback(semantic 設置)
 * @property {Function} onBlur onBlur綁定 callback(semantic 設置)
 * @property {boolean} disabled disabled 屬性(semantic 設置)
 */

/**
 * 帳號 input 輸入組件
 * - 預設 value 類型僅能為 string
 * - 統一去除輸入空白
 * - 未標明註釋給入 props 以 semantic input 組件可用為主
 *
 * @param {object} props 外部參數
 * ------- input -------
 * @param {string} props.value value 屬性
 * @param {Function} props.onChange onChange綁定 callback
 * ------- 模糊 checkbox -------
 * @param {string} props.checkboxName name 屬性
 * @param {boolean} props.checked checked 屬性
 * @param {Function} props.onFuzzyChange onChange綁定 callback
 * @param {object} props.formFileStyle Form.File 用 css style (限用模糊 Form.Field 樣式)
 * @param {boolean} props.disableTrim disableTrim 禁止去空白
 * ------- 共用 -------
 * @param {boolean} props.fuzzy 是否啟用模糊搜尋樣式
 * @param {boolean} props.noFormStyle 是否關閉 Form || Form.Field 包裝樣式
 * @param {boolean} props.batch 是否啟用批量模式
 * @param {number} props.batchMax 批量上限(預設 200)
 * @returns {JSX} UserBasicInput 帳號 純 input 輸入組件
 * ===========================================================================
 * @example <caption>基本樣式</caption>
 * <UserBasicInput
 *   name="username"
 *   value={username}
 *   onChange={onChange}
 *   placeholder="請輸入名稱"
 * />
 * ------------------------------
 * @example <caption>基本樣式 - Form 包裝樣式(預設不啟用)</caption>
 * 啟用 noFormStyle (true)
 * // return <Form.Input ..... />
 * 不啟用 noFormStyle (false)
 * // return <Input ..... />
 * ------------------------------
 * @example <caption>基本|模糊樣式 - 批量</caption>
 * 啟用 batch (true) // 檢查是否超出輸入帳號數量
 * ------------------------------
 * @example <caption>模糊樣式</caption>
 * <UserBasicInput
 *   fuzzy
 *   name="username"
 *   value={username}
 *   onChange={onChange}
 *   placeholder="請輸入名稱"
 *   checked={checkboxChecked}
 *   onFuzzyChange={checkboxOnChange}
 * />
 * ------------------------------
 * @example <caption>基本樣式 - Form.Field 包裝樣式(預設不啟用)</caption>
 * 啟用 noFormStyle (true)
 * // return <Form.Field><Form.Input... /></Form.Field>
 * 不啟用 noFormStyle (false)
 * // return <Form.Input ..... />
 */
function UserBasicInput(props) {
//   const { tr, setError } = useContext(ApiContext);
  const {
    value,
    onChange,
    checkboxName,
    checked,
    onFuzzyChange,
    fuzzy,
    noFormStyle,
    batch,
    batchMax,
    formFileStyle,
    disableTrim,

    /**
     * 組件內不解構賦值參數統一為一個參數,
     * 主要轉賦值給 input props (不需外部指名賦值)
     *
     * @type {InputPropsList}
     */
    ...InputPropsList
  } = props;

  // 過濾儲存 input 輸入內容
  const [inputVal, setInputVal] = useState('');

  /**
   * 預處理輸出字符(含 Zero-Width-Space)
   * - 主要針對字串
   *
   * @param {any} text 須轉換的文字
   * @returns {string} 轉換後去空白的文字 | 原始文字
   */
  function preHandleValue(text) {
    return (typeof text === 'string' && !disableTrim) ? text.replace(/\u200B|\s+/g, '') : text;
  }

  /**
   * 是否達到批量上限
   * - 以 ',' 為基準分割計算
   *
   * @param {string} val 欲檢查字串
   * @returns {boolean} 是否達到上限值
   */
  function checkOverMax(val) {
    if (batch && val.indexOf(',') > -1) {
      // 是否達到批量最大值
      if (val.split(',').length > batchMax) {
        return true;
      }
    }

    return false;
  }

  /**
   * input 呼叫 onChange 前中介包裝 function
   * - 過濾輸入空白
   *
   * @param {Event} e 事件
   * @param {object} args 事件傳入參數
   */
  function handleMiddleInputChange(e, args) {
    const { value: val } = args;
    const newInputVal = preHandleValue(val);

    if (checkOverMax(newInputVal)) {
      console.error('超出最大輸入數量')
      return;
    }

    setInputVal(newInputVal);
    onChange(e, { ...args, value: newInputVal });
  }

  /**
   * 基本樣式 input
   * - 依 noFormStyle 決定輸出樣式
   * - 樣式: Input | Form.Input
   *
   * @returns {JSX} 基本 input 組件
   */
  function renderBasicInput() {
    const InputComponent = (noFormStyle) ? Input : Form.Input;

    return (
      <InputComponent
        {...InputPropsList}
        value={inputVal}
        onChange={handleMiddleInputChange}
      />
    );
  }

  /**
   * 模糊樣式 input
   * - 依 noFormStyle 決定輸出樣式
   * - 樣式: Form.Field 包裝及不包裝
   *
   * @returns {JSX} 帶有模糊 checkbox 的 input 組件
   */
  function renderFuzzyInput() {
    const inputComponent = (
      <Form.Input
        {...InputPropsList}
        className="input-fuzzy"
        value={inputVal}
        onChange={handleMiddleInputChange}
      >
        <input />
        <Checkbox
          name={checkboxName}
          label="模糊"
          checked={checked}
          onChange={onFuzzyChange}
        />
      </Form.Input>
    );

    // 不包裝Form.Field
    if (noFormStyle) {
      return inputComponent;
    }

    return (
      <Form.Field className="input-fuzzy" style={formFileStyle}>
        {inputComponent}
      </Form.Field>
    );
  }

  useEffect(() => {
    // 取得外部初始創建 input 值
    setInputVal(preHandleValue(value));
  }, []);

  useEffect(() => {
    setInputVal(preHandleValue(value));
  }, [value]);

  // render ------------------------------------
  if (fuzzy) {
    return renderFuzzyInput();
  }

  return renderBasicInput();
}

UserBasicInput.defaultProps = {
  value: '',
  onChange: () => {},
  checked: false,
  fuzzy: false,
  noFormStyle: false,
  batch: false,
  batchMax: 200,
  formFileStyle: {},
  disableTrim: false,
};

UserBasicInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  fuzzy: PropTypes.bool,
  noFormStyle: PropTypes.bool,
  batch: PropTypes.bool,
  batchMax: PropTypes.number,
  formFileStyle: PropTypes.objectOf(PropTypes.any),
  disableTrim: PropTypes.bool,
};

export default UserBasicInput;
