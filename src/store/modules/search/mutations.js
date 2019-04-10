import { SAVE_LIST_PAGE_PARS } from './types'

export default {
  [SAVE_LIST_PAGE_PARS] (state, { path, pars }) {
    state.listPagePars.set(path, pars)
  }
}
