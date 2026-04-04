export interface Fact {
  label: string;
  value: string;
}

export interface Exhibit {
  id: string;
  icon: string;
  era: string;
  name: string;
  description: string;
  body: string;
  facts: Fact[];
}

export interface TimelineEvent {
  id: number;
  year: string;
  event: string;
  note: string;
  position: 'left' | 'right';
  sort_order: number;
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
}