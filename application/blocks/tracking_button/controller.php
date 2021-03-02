<?php
namespace Application\Block\TrackingButton;

use Concrete\Core\Block\BlockController;
use Page;
use File;
use Less_Parser;
use Less_Tree_Rule;

class Controller extends BlockController
{
    protected $btTable = 'btTrackingButton';
    protected $btExportTables = ['btTrackingButton'];
    protected $btInterfaceWidth = '600';
    protected $btWrapperClass = 'ccm-ui';
    protected $btInterfaceHeight = '465';
    protected $btCacheBlockRecord = true;
    protected $btCacheBlockOutput = true;
    protected $btCacheBlockOutputOnPost = true;
    protected $btCacheBlockOutputForRegisteredUsers = false;

    public function getBlockTypeDescription()
    {
        return t('Navigation button that passes analytics tracking parameters forward to destination.');
    }

    public function getBlockTypeName()
    {
        return t('Tracking Button');
    }

    public function on_start()
    {

    }

    public function registerViewAssets($outputContent = '')
    {
        $this->requireAsset('core/sitemap');
    }

    public function edit()
    {
        $db = $this->app->make('database')->connection();
        $query = $db->fetchAssoc('SELECT * from btTrackingButton WHERE bID = ?', [$this->bID]);
        $this->set('data', $query);
    }

    public function view()
    {
        $db = $this->app->make('database')->connection();
        $d = $db->fetchAssoc('SELECT * from btTrackingButton WHERE bID = ?', [$this->bID]);
        //$lc = Page::getByID($d['linkCID'], 'ACTIVE');
        //$d['linkURL'] = ($lc->getCollectionPointerExternalLink() != '') ? $lc->getCollectionPointerExternalLink() : $lc->getCollectionLink();

        $this->set('data', $d);
    }

    public function delete()
    {
        $db = $this->app->make('database')->connection();
        $db->delete('btTrackingButton', ['bID' => $this->bID]);
        parent::delete();
    }

    public function save($args)
    {
        $db = $this->app->make('database')->connection();
        $d = $db->fetchAssoc('SELECT * from btTrackingButton WHERE bID = ?', [$this->bID]);
        $data = [
            'title' => $args['title'],
            'href' => $args['href'],
            'openNew' => ($args['openNew']) ? 1 : -1
        ];
        if ($d) {
            $db->update('btTrackingButton', $data, ['bID' => $this->bID]);
        } else {
            $db->executeQuery('INSERT INTO btTrackingButton (bID,title,href,openNew) VALUES(?,?,?,?)', [$this->bID, $data['title'], $data['href'], $data['openNew']]);
        }
    }

    public function build_http_query($query, $allowed_keys) {
        $query_array = [];

        $i = 0;
        foreach($query as $key => $value) {
            $i++;
            if (in_array($key, $allowed_keys)) {
                $query_array[] = urlencode( $key ) . '=' . urlencode( $value );
                if (count($query) > $i) $query_array[] = '&';
            }
        }

        if (count($query_array) > 0) array_unshift($query_array, '?');

        return implode('', $query_array);
    }
}
