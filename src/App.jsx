import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';
import User from './components/User';

function App() {
  const [personas, setPersonas] = useState([
    { name: 'Guille', id: 1 },
    { name: 'Seba', id: 2 },
    { name: 'GSM', id: 3 },
  ]);

  const handleDrag = e => {
    const { active, over } = e;

    setPersonas(personas => {
      const oldIndex = personas.findIndex(person => person.id === active.id);
      const newIndex = personas.findIndex(person => person.id === over.id);
      return arrayMove(personas, oldIndex, newIndex);
    });
  };

  return (
    <div className='flex justify-center items-center'>
      <div className='w-4/6'>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDrag}
        >
          <h1 className='text-2xl font-bold'>Drag n Drop Users List</h1>
          <SortableContext
            items={personas}
            strategy={verticalListSortingStrategy}
          >
            {personas.map(user => (
              <User
                user={user}
                key={user.id}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default App;
