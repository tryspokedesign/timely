import { useState } from 'react';
import { TextInput, NumberInput, Textarea, Button, Paper, Container, Space } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { supabase } from '../lib/supabase';

export function AddTimeLog() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [hours, setHours] = useState<number | undefined>(undefined);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !hours) {
      notifications.show({
        title: 'Error',
        message: 'Please fill in all required fields',
        color: 'red',
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('time_logs')
        .insert([
          {
            date: date.toISOString(),
            hours,
            notes,
            // In a real app, these would come from the authenticated user and selected project
            user_id: 'demo-user',
            project_id: 'demo-project',
          },
        ]);

      if (error) throw error;

      notifications.show({
        title: 'Success',
        message: 'Time log added successfully',
        color: 'green',
      });

      // Reset form
      setDate(new Date());
      setHours(undefined);
      setNotes('');
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to add time log',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm">
      <Paper p="md" radius="md" withBorder>
        <form onSubmit={handleSubmit}>
          <DatePickerInput
            label="Date"
            placeholder="Pick a date"
            value={date}
            onChange={(value: Date | null) => setDate(value)}
            required
          />
          <Space h="md" />
          
          <NumberInput
            label="Hours"
            placeholder="Enter hours worked"
            min={0}
            max={24}
            value={hours}
            onChange={(value: number | '') => setHours(typeof value === 'number' ? value : undefined)}
            required
            step={0.5}
            stepHoldDelay={500}
            stepHoldInterval={100}
          />
          <Space h="md" />

          <Textarea
            label="Notes"
            placeholder="Add any notes about the work done"
            value={notes}
            onChange={(e) => setNotes(e.currentTarget.value)}
            minRows={3}
          />
          <Space h="md" />

          <Button type="submit" loading={loading} fullWidth>
            Submit Time Log
          </Button>
        </form>
      </Paper>
    </Container>
  );
} 