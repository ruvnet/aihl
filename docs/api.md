# API Integration Documentation

## OpenAI API
### Setup
1. Obtain API key from OpenAI dashboard
2. Store API key in `.env` file
3. Use `useOpenAI` hook for API calls

### Request/Response Handling
```javascript
const { sendMessage } = useOpenAI();
const response = await sendMessage(prompt, context);
```

### Integration Examples
- Code evaluation in AIJudiciaryTab
- Skill assessment in ProfilePage

## Supabase API
### Configuration
1. Set up Supabase project
2. Add Supabase URL and API key to `.env` file
3. Initialize Supabase client in `src/integrations/supabase/supabase.js`

### Data Access
Use React Query hooks in `src/integrations/supabase/hooks/` for data operations

### Real-time Data
Implement Supabase real-time subscriptions for live updates

## Error Handling
- Implement try/catch blocks for API calls
- Use React Query's error handling features
- Log errors for debugging and monitoring

## Performance Considerations
- Implement caching with React Query
- Use pagination for large data sets
- Optimize API call frequency and payload size