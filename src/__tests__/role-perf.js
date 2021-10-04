import {queryAllByRole} from '../queries/role'
import {render} from './helpers/test-utils'

const times = []
afterAll(() => {
  const sum = times.reduce((a, b) => a + b)
  console.log(times.length, sum, sum / times.length)
})

function setup() {
  return render(`
<section aria-label="a region" data-testid='named-section'>
  <a href="http://whatever.com" data-testid="a-link">link</a>
  <a>invalid link</a>

  <nav data-testid='a-nav' />
  
  <h1 data-testid='a-h1'>Main Heading</h1>
  <h2 data-testid='a-h2'>Sub Heading</h2>
  <h3 data-testid='a-h3'>Tertiary Heading</h3>

  <article data-testid='a-article'>
    <!-- menuitem is currently deprecated, but is the only 
         tag currently that aria-query returns multiple roles for
         (roles: command, menuitem).
         It's used here in case a future tag also has multiple 
         roles -->
    <menuitem data-testid='a-menuitem-1'>1</menuitem> 
    <menuitem data-testid='a-menuitem-2'>2</menuitem>

    <ul data-testid='a-list'>
      <li data-testid='a-list-item-1'>Item 1</li>
      <li data-testid='a-list-item-2'>Item 2</li>
    </ul>

    <table data-testid='a-table'>
      <tbody data-testid='a-tbody'>
        <tr data-testid='a-row'>
          <td data-testid='a-cell-1'>Cell 1</td>
          <td data-testid='a-cell-2'>Cell 2</td>
          <td data-testid='a-cell-3'>Cell 3</td>
        </tr>
      </tbody>
    </table>

    <form aria-label="a form" data-testid='named-form'>
      <input type='radio' data-testid='a-radio-1' />
      <input type='radio' data-testid='a-radio-2' />
      <input type='text' data-testid='a-input-1' />
      <input type='text' data-testid='a-input-2' />
      <textarea data-testid='a-textarea'></textarea>
    </form>

    <ul data-testid='b-list'>
      <li data-testid='b-list-item-1'>Item 1</li>
      <li data-testid='b-list-item-2'>Item 2</li>
    </ul>

    <form data-testid="a-form" />
    <section data-testid="a-section" />
   </article>
</section>
  `)
}

test.each(Array(1000).fill(null))('getByRole table', () => {
  const {container} = setup()

  const t0 = performance.now()
  expect(queryAllByRole(container, 'table')).toHaveLength(1)
  const t1 = performance.now()
  times.push(t1 - t0)
})
