import { createLocalVue, mount } from '@vue/test-utils'
import AddEmployeeModal from '@/components/three/AddEmployeeModal.vue'
import { describe, expect, it } from 'vitest'

const localVue = createLocalVue()

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
