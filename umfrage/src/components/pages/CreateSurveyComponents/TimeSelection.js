import React, { Component } from 'react';
import { Form, Button, DropdownMenu, DropdownItem, DropdownHeader, Dropdown, FormDropdown, FormField, Checkbox } from 'semantic-ui-react';


class TimeSelection extends Component{

    render(){

        return <div>
        <div class='grouped field'>
          <h3>Wie lange soll die Umfrage dauern ?</h3>

          <FormField>
            <div class="ui radio checkbox">
              <input type="radio" name="example2"></input>
              <label>1 Tag</label>
            </div>
          </FormField>
          <FormField>
            <div class="ui radio checkbox">
              <input type="radio" name="example2"></input>
              <label>2 Tage</label>
            </div>
          </FormField>
          <FormField>
            <div class="ui radio checkbox">
              <input type="radio" name="example2"></input>
              <label>3 Tage</label>
            </div>
          </FormField>
          <FormField>
            <div class="ui radio checkbox">
              <input type="radio" name="example2"></input>
              <label>7 Tage</label>
            </div>
          </FormField>
          <FormField>
            <div class="ui radio checkbox">
              <input type="radio" name="example2"></input>
              <label>10 Tage</label>
            </div>
          </FormField>
          <FormField>
            <div class="ui radio checkbox">
              <input type="radio" name="example2"></input>
              <label>14 Tage</label>
            </div>
          </FormField>
        
        </div>
      </div>
    }

}


export default TimeSelection;


