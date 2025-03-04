import Selects from '@/packages/selects'
import style from './index.module.scss'
import { observer } from 'mobx-react'
import accountStore from '@/store/modules/account'
import { Translation } from '@/components/hooks/Translation'
import { useMemo, useRef, useState } from 'react'
import { Button } from 'antd'
import { getSvgIcon } from '@/svgsIcon'
import useWindow from '@/components/hooks/useWindown'

interface Props {
  selectGroup: string
  selectMiner?: string
  selectTag?: string
  addRule?: boolean
  isAllMiner?: boolean
  isAllGroup?: boolean
  disableAll?: boolean
  reset?: boolean
  classes?: Record<string, any>
  showTagLabel?: boolean
  onChange: (type: string, value: string | number | boolean) => void
}
export default observer((props: Props) => {
  const {
    onChange,
    reset,
    disableAll = false,
    isAllMiner = true,
    selectGroup,
    isAllGroup = true,
    selectMiner,
    selectTag,
    showTagLabel,
    addRule,
    classes,
  } = props
  const { groupMiners } = accountStore
  const { tr } = Translation({ ns: 'account' })
  const { isMobile } = useWindow()
  const [selectItem, setSelectItem] = useState<Record<string, any>>({})
  const [selectMinerItem, setSelectMinerItem] = useState<Record<string, any>>(
    {},
  )

  const [groups, allMiners, allTags] = useMemo(() => {
    const newMinerGroups: Array<any> = []
    const allMiners: Array<any> = []
    if (isAllMiner) {
      allMiners.push({
        label: tr('all_miners'),
        value: 'all',
      })
    }
    const allTags: Record<string, string> = {}
    groupMiners?.forEach((group) => {
      const miners: Array<any> = []
      const tags: Record<string, string> = {}
      if (isAllMiner) {
        miners.push({
          label: tr('all_miners'),
          value: 'all',
        })
      }
      group?.miners_info?.forEach((v) => {
        allMiners.push({
          miner_tag: v.miner_tag,
          label: showTagLabel
            ? `${String(v.miner_id)}  ${v.miner_tag ? `(${v.miner_tag})` : ''}`
            : String(v.miner_id),
          value: String(v.miner_id),
        })
        miners.push({
          miner_tag: v.miner_tag,
          label: showTagLabel
            ? `${String(v.miner_id)}  ${v.miner_tag ? `(${v.miner_tag})` : ''}`
            : String(v.miner_id),
          value: String(v.miner_id),
        })
        if (v.miner_tag) {
          allTags[v.miner_tag] = v.miner_tag
          tags[v.miner_tag] = v.miner_tag
        }
      })
      if (group.is_default) {
        group.label = tr(group.group_name)
      }
      newMinerGroups.push({ ...group, miners: miners, tags: tags })
    })

    const newGroups: Array<any> = []
    if (isAllGroup) {
      newGroups.push({
        label: tr('all_groups'),
        group_name: 'all_groups',
        value: 'all',
        miners: [...allMiners],
      })
    }

    return [newGroups.concat(newMinerGroups), allMiners, allTags]
  }, [tr, groupMiners, isAllMiner, showTagLabel])

  const showTags = useMemo(() => {
    const newTags = [
      {
        label: tr('all_tags'),
        value: 'all',
      },
    ]
    if (selectMinerItem.value && selectMinerItem.value !== 'all') {
      if (selectMinerItem.miner_tag) {
        newTags.push({
          label: selectMinerItem.miner_tag,
          value: selectMinerItem.miner_tag,
        })
      }
    } else if (selectItem.group_id) {
      Object.keys(selectItem.tags)?.forEach((tagKey) => {
        if (tagKey) {
          newTags.push({
            label: tagKey,
            value: tagKey,
          })
        }
      })
    } else if (allTags && Object.keys(allTags).length > 0) {
      Object.keys(allTags).forEach((tagKey) => {
        if (tagKey) {
          newTags.push({
            label: tagKey,
            value: tagKey,
          })
        }
      })
    }
    return newTags
  }, [allTags, selectItem, selectMinerItem])

  const handleChange = (
    type: string,
    value: string | number | boolean,
    item?: any,
  ) => {
    if (type === 'group') {
      setSelectItem(item)
    } else if (type === 'miner') {
      setSelectMinerItem(item)
    }
    onChange(type, value)
  }

  return (
    <div className={style.header}>
      <div className={style.header_left}>
        <Selects
          style={{ width: '200px' }}
          disabled={disableAll}
          value={selectGroup}
          className={classes?.group}
          placeholder={tr('select_group')}
          options={groups || []}
          onChange={(v: string, item: any) => {
            handleChange('group', v, item)
          }}
        />
        {props.hasOwnProperty('selectMiner') && (
          <Selects
            disabled={disableAll}
            style={{ width: '200px' }}
            value={selectMiner}
            className={classes?.miner}
            placeholder={tr('select_miner')}
            options={selectItem?.miners ? selectItem?.miners || [] : allMiners}
            onChange={(v: string, item: any) => {
              handleChange('miner', v, item)
            }}
          />
        )}
        {props.hasOwnProperty('selectTag') && (
          <Selects
            style={{ width: '200px' }}
            disabled={disableAll}
            value={selectTag}
            placeholder={tr('select_miner_tag')}
            options={showTags}
            onChange={(v: string, item: any) => {
              handleChange('miner_tag', v, item)
            }}
          />
        )}
        {!isMobile && reset && (
          <Button
            className="cancel_btn !min-w-fit gap-x-1 !px-2"
            onClick={() => {
              handleChange('reset', 'all')
            }}
          >
            {getSvgIcon('reset')}
            {tr('reset_button')}
          </Button>
        )}
      </div>
      {!isMobile && addRule && (
        <Button
          className="primary_btn"
          onClick={() => handleChange('addRules', true)}
        >
          {tr('add_rules')}
        </Button>
      )}
    </div>
  )
})
