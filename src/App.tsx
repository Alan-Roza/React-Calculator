import React from 'react';
import { ReactComponent as Backspace } from './assets/backspace.svg'
import { ReactComponent as History } from './assets/history.svg'
import { ReactComponent as Less } from './assets/less.svg'
import { ReactComponent as Percent } from './assets/percent.svg'
import { ReactComponent as Plus } from './assets/plus.svg'
import { ReactComponent as Multiplier } from './assets/multiplier.svg'
import './App.scss';

function App() {
  return (
    <div className='background-calculator'>
      <div className='calculator'>
        <div className='calculator__display'>
          <div className='calculator__results'></div>
          <div className='calculator__current-value'></div>
        </div>
        <div className='calculator__keyboard'>
          <Percent className='calculator__percentage calculator__key' />
          <Backspace className='calculator__backspace calculator__key' />
          <Multiplier className='calculator__multiplier calculator__key' />
          <Less className='calculator__less calculator__key' />
          <Plus className='calculator__plus calculator__key' />
          <div className='calculator__history calculator__key'><History className='calculator__history-icon' />History</div>
          <div className='calculator__clear calculator__key'>C</div>
          <div className='calculator__open-parentheses calculator__key'>{'('}</div>
          <div className='calculator__close-parentheses calculator__key'>{')'}</div>
          <div className='calculator__division calculator__key'>{'/'}</div>
          <div className='calculator__equal calculator__key'>{'='}</div>
          <div className='calculator__dot calculator__key'>.</div>
          <div className='calculator__zero calculator__key'>0</div>
          <div className='calculator__one calculator__key'>1</div>
          <div className='calculator__two calculator__key'>2</div>
          <div className='calculator__three calculator__key'>3</div>
          <div className='calculator__four calculator__key'>4</div>
          <div className='calculator__five calculator__key'>5</div>
          <div className='calculator__six calculator__key'>6</div>
          <div className='calculator__seven calculator__key'>7</div>
          <div className='calculator__eight calculator__key'>8</div>
          <div className='calculator__nine calculator__key'>9</div>
        </div>
      </div>
    </div>
  );
}

export default App;
