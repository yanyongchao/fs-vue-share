import { SAVE_LIST_PAGE_PARS } from './types'
export default {
  SaveListPagePars ({ commit }, { path, pars }) {
    commit(SAVE_LIST_PAGE_PARS, { path, pars })
  }
}
