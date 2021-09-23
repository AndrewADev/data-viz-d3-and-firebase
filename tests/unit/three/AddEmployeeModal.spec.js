import BootstrapVue from 'bootstrap-vue'
import { createLocalVue, mount } from '@vue/test-utils'
import AddEmployeeModal from '@/components/three/AddEmployeeModal'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('AddEmployeeModal', () => {
  // i.e. does validation instead of disappearing
  it('does not disappear on button click', () => {
    const wrapper = mount(AddEmployeeModal, {
      attachTo: document.body,
      localVue,
      propsData: {
        static: true
      }
    })

    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.isVisible).toBeTruthy()
    wrapper.destroy()
  })
})
