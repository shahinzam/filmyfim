def create_recommendation_prompt(movie_title: str) -> str:
    return f"""As a film expert specializing in genre analysis, provide 5 movie recommendations similar to '{movie_title}'.
Consider these key aspects:

1. Primary and Secondary Genres:
   - Match the main genre combinations (e.g., sci-fi thriller, romantic comedy)
   - Similar mood and atmosphere

2. Plot Elements and Themes:
   - Comparable storylines and plot structures
   - Similar central themes and messages
   - Character dynamics and relationships

3. Target Audience and Appeal:
   - Similar viewer demographics
   - Comparable emotional impact
   - Matching entertainment style

4. Production Era and Style:
   - Similar production values
   - Comparable visual and narrative techniques
   - Time period relevance

5. Cultural and Critical Reception:
   - Similar audience reactions
   - Comparable critical recognition
   - Cultural significance

Provide exactly 5 highly relevant movie titles that closely match these aspects of '{movie_title}'.
Return ONLY the movie titles, one per line, with no additional text or numbering.

Example format:
The Matrix
Inception
Blade Runner
Dark City
Ex Machina""" 