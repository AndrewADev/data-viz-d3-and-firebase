import { mount } from '@vue/test-utils'
import AddBudgetItem from '../../../src/components/one/AddBudgetItem'

describe('AddBudgetItem', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AddBudgetItem, {
    })
  })

  it('rejects invalid args', () => {
    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.vm.errorMessage).not.toBeNull()
  })

  it('accepts valid arguments', () => {
    wrapper.setData({ cost: 5, name: 'test docs' })
    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.emitted('add-item')).toBeTruthy()
  })
})
