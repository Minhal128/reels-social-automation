import React from 'react'
import { Search, LayoutGridIcon, List } from 'lucide-react'
import Input from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CharacterSearchBarProps } from '@/types/character'

export const CharacterSearchBar: React.FC<CharacterSearchBarProps> = ({
  searchTerm,
  onSearchChange,
  viewMode,
  onViewModeChange,
  placeholder = 'Search characters...',
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 rtl:right-3 rtr:left-auto top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 rtl:pr-10"
        />
      </div>

      <div className="flex items-center gap-1 dark:bg-white/3! border bg-white rounded-border-radius p-1 h-10">
        <Button
          variant="outline"
          onClick={() => onViewModeChange('grid')}
          className={cn(
            'flex h-8! w-8! p-0! items-center justify-center rounded-border-radius-inner! transition-all duration-200',
            viewMode === 'grid'
              ? 'primary-btn text-white shadow-md'
              : 'text-subtitle-color bg-white/3! border-none'
          )}
        >
          <LayoutGridIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          onClick={() => onViewModeChange('list')}
          className={cn(
            'flex h-8! w-8! p-0! items-center justify-center rounded-border-radius-inner! transition-all duration-200',
            viewMode === 'list'
              ? 'primary-btn text-white shadow-md'
              : 'text-subtitle-color bg-white/3! border-none'
          )}
        >
          <List className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
