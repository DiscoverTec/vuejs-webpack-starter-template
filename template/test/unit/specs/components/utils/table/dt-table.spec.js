import { shallow, mount } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'
import Component from '@/components/utils/table/dt-table.vue'

describe(`Component ${Component.name}`, () => {

  const tableColumnsSimple = [
    {
      field: 'id',
      label: 'ID'
    },
    {
      field: 'firstName',
      label: 'First Name'
    },
    {
      field: 'lastName',
      label: 'Last Name'
    },
    {
      field: 'date',
      label: 'Date'
    }
  ]

  const tableColumnsSort = [
    {
      field: 'id',
      label: 'ID',
      sortable: true
    },
    {
      field: 'firstName',
      label: 'First Name',
      sortable: true
    },
    {
      field: 'lastName',
      label: 'Last Name'
    },
    {
      field: 'date',
      label: 'Date'
    }
  ]


  const tableColumnsHidden = [
    {
      field: 'id',
      label: 'ID',
      hidden: true
    },
    {
      field: 'firstName',
      label: 'First Name',
      hidden: true
    },
    {
      field: 'lastName',
      label: 'Last Name'
    },
    {
      field: 'date',
      label: 'Date'
    }
  ]

  const tableData = [
    {
      id: 1,
      firstName: 'Jesse',
      lastName: 'Simmons',
      date: '2016/10/15 13:43:27',
    },
    {
      id: 2,
      firstName: 'John',
      lastName: 'Jacobs',
      date: '2016/12/15 06:00:53',
    },
    {
      id: 3,
      firstName: 'Tina',
      lastName: 'Gilbert',
      date: '2016/04/26 06:26:28',
    },
    {
      id: 4,
      firstName: 'Clarence',
      lastName: 'Flores',
      date: '2016/04/10 10:28:46',
    },
    {
      id: 5,
      firstName: 'Anne',
      lastName: 'Lee',
      date: '2016/12/06 14:38:38',
    }
  ]

  it('should render an empty table', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Component, {})
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('should render an empty table with slot message', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Component, {
      slots: {
        empty: 'This is empty message'
      }
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('should render an empty table with footer message', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Component, {
      slots: {
        tfoot: 'This is footer message'
      }
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('should render a body with only props table data', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Component, { propsData: { value: tableData } })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('should render a header and body with only props table data and columns', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Component, {
      propsData: {
        value: tableData,
        columns: tableColumnsSimple
      }
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  // WIP Scoped Slots - https://github.com/vuejs/vue-test-utils/issues/156
  /*
  it('should render a header and body with head and body slots', () => {
    const renderer = createRenderer()
    const wrapper = mount(Component, {
      slots: {
        thead: '[H] \{{props.column.field}}',
        tbody: `
          <td> [T] \{{props.row.id}} </td>
          <td> [E] \{{props.row.firstName}} </td>
          <td> [S] \{{props.row.lastName}} </td>
          <td> [T] \{{props.row.date}} </td>
        `
      },
      propsData: {
        value: tableData,
        columns: tableColumnsSimple
      }
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('should display details when expanding row', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Component, {
      slots: {
        detail: 'This is Details'
      },
      propsData: {
        value: tableData,
        columns: tableColumnsSort
      }
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })
  */

  it('should change sort direction on click', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Component, {
      propsData: {
        value: tableData,
        columns: tableColumnsSort
      }
    })
    wrapper.findAll('th').at(0).trigger('click')
    expect(wrapper.emitted().sort).toMatchSnapshot('sort emitted')
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('should change sort direction and sort on when clicked', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Component, {
      propsData: {
        value: tableData,
        columns: tableColumnsSort
      }
    })
    wrapper.findAll('th').at(1).trigger('click')
    wrapper.findAll('th').at(1).trigger('click')
    expect(wrapper.emitted().sort).toMatchSnapshot('sort emitted')
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('should not sort when column is not sortable', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Component, {
      propsData: {
        value: tableData,
        columns: tableColumnsSort
      }
    })
    wrapper.findAll('th').at(2).trigger('click')
    expect(wrapper.emitted().sort).toBeFalsy()
  })

  it('should set the default sort on column and direction', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Component, {
      propsData: {
        value: tableData,
        columns: tableColumnsSort,
        sortOn: 'firstName',
        sortDir: 'asc'
      }
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('should omit sort on and direction if column is not sortable', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Component, {
      propsData: {
        value: tableData,
        columns: tableColumnsSimple,
        sortOn: 'firstName',
        sortDir: 'asc'
      }
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('should always flip sort if column is default to asc', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Component, {
      propsData: {
        value: tableData,
        columns: tableColumnsSort,
        sortOn: 'firstName',
        sortDir: 'asc'
      }
    })
    wrapper.findAll('th').at(1).trigger('click')
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('should hide columns only', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Component, {
      propsData: {
        columns: tableColumnsHidden
      }
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('should hide columns and data when no slot is used', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Component, {
      propsData: {
        value: tableData,
        columns: tableColumnsHidden
      }
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })


  it('should emit toggle when toggle detail is called', () => {
    const testRow = {
      id: 1,
      isDetailVisible: false
    }
    const renderer = createRenderer()
    const wrapper = shallow(Component)
    wrapper.vm.toggleDetail(testRow)
    expect(wrapper.emitted().toggle).toMatchSnapshot()
  })
})
