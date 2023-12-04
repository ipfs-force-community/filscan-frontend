import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-monokai'

import { useMemo } from 'react'
import filscanStore from '@/store/modules/filscan'
import { observer } from 'mobx-react'

export default observer((props: any) => {
  const { theme, lang } = filscanStore
  const showValue = useMemo(() => {
    return props.value || 'test value'
  }, [props.value])

  const showTheme = useMemo(() => {
    if (theme === 'dark') {
      return 'monokai'
    }
    return 'github'
  }, [theme])

  return (
    <AceEditor
      mode="java"
      style={{ width: '100%' }}
      theme={showTheme}
      name="blah2"
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={showValue}
      {...props.otherProps}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  )
})
