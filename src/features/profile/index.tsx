import { ErrorState, LoadingState } from 'shared/ui/states';
import { useProfilePage } from './model';
import { ProfileView } from './ui/profile';

export const Profile = () => {
  const vm = useProfilePage();

  if (vm.status === 'loading') return <LoadingState />;
  if (vm.status === 'error') return <ErrorState error={vm.message} />;

  return (
    <ProfileView
      routeUsername={vm.routeUsername}
      displayUsername={vm.displayUsername}
      bio={vm.bio}
      imageSrc={vm.imageSrc}
      following={vm.following}
      articlesTab={vm.articlesTab}
      isOwnProfile={vm.isOwnProfile}
      followDisabled={vm.followDisabled}
      followLoading={vm.followLoading}
      articles={vm.articles}
      articlesLoading={vm.articlesLoading}
      articlesFetching={vm.articlesFetching}
      articlesError={vm.articlesError}
      pendingFavoriteSlug={vm.pendingFavoriteSlug}
      onFollow={vm.onFollow}
      onToggleFavorite={vm.onToggleFavorite}
    />
  );
};

export {
  type ProfileArticlesTab,
  type ProfileViewProps,
  useProfile,
  useProfileArticles,
  useProfilePage,
} from './model';

export { ProfileView } from './ui/profile';
