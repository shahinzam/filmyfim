export const translateGenre = (genre: string): string => {
  const genreMap: { [key: string]: string } = {
    'Action': 'اکشن',
    'Adventure': 'ماجراجویی',
    'Animation': 'انیمیشن',
    'Comedy': 'کمدی',
    'Crime': 'جنایی',
    'Documentary': 'مستند',
    'Drama': 'درام',
    'Family': 'خانوادگی',
    'Fantasy': 'فانتزی',
    'Horror': 'ترسناک',
    'Musical': 'موزیکال',
    'Mystery': 'رازآلود',
    'Romance': 'عاشقانه',
    'Science Fiction': 'علمی تخیلی',
    'Thriller': 'هیجان‌انگیز',
    'War': 'جنگی'
  };

  return genreMap[genre] || genre;
}; 