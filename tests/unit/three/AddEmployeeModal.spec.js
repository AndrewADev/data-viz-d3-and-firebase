import BootstrapVue from 'bootstrap-vue'
import { createLocalVue, mount } from '@vue/test-utils'
import AddEmployeeModal from '@/components/three/AddEmployeeModal'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('AddEmployeeModal', () => {
  it('passes up add employee event on button click', () => {
    const wrapper = mount(AddEmployeeModal, {
      attachToDocument: true,
      localVue,
      propsData: {
        static: true
      }
    })

    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.emitted('add-new-employee')).toBeTruthy()
  })
})
