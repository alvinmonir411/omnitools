import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

describe('UI Primitives Component Suite', () => {
  it('renders Button with variants and handles clicks', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} variant="primary">Click Me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders Button in loading state and disables interaction', () => {
    const handleClick = vi.fn();
    render(<Button isLoading onClick={handleClick}>Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders Input with accessible labels and error messages', () => {
    render(
      <Input
        label="Username"
        placeholder="Enter username"
        error="Username is required"
      />
    );
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    const input = screen.getByPlaceholderText(/enter username/i);
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders Textarea with mono font styling and custom rows', () => {
    render(<Textarea label="Code Input" mono placeholder="Enter code here" />);
    const textarea = screen.getByLabelText(/code input/i);
    expect(textarea).toBeInTheDocument();
    expect(textarea.className).toContain('font-mono');
  });

  it('renders Card hierarchy correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Card Title</CardTitle>
        </CardHeader>
        <CardContent>Test Card Body Content</CardContent>
      </Card>
    );
    expect(screen.getByText('Test Card Title')).toBeInTheDocument();
    expect(screen.getByText('Test Card Body Content')).toBeInTheDocument();
  });

  it('renders Badge variants', () => {
    render(<Badge variant="success">Completed</Badge>);
    const badge = screen.getByText('Completed');
    expect(badge).toBeInTheDocument();
  });

  it('renders Alert with proper role and title', () => {
    render(<Alert variant="danger" title="Validation Error">Syntax is invalid</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(screen.getByText('Validation Error')).toBeInTheDocument();
    expect(screen.getByText('Syntax is invalid')).toBeInTheDocument();
  });

  it('switches Tabs properly', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );

    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

    const tab2 = screen.getByRole('tab', { name: /tab 2/i });
    fireEvent.click(tab2);

    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });
});
