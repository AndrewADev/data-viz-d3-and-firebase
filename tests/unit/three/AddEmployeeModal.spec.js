import { mount } from '@vue/test-utils'
import AddEmployeeModal from '@/components/three/AddEmployeeModal'

describe('AddEmployeeModal', () => {
  // i.e. does validation instead of disappearing
  it('does not disappear on button click', () => {
    const wrapper = mount(AddEmployeeModal, {
      attachTo: document.body,
      propsData: {
        static: true
      }
    })

    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.isVisible).toBeTruthy()
    wrapper.unmount()
  })
})
